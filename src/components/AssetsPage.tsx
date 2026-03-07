import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import { getAssets } from '@/api/assets.api';
import type { Asset, AssetType } from '@/types';
import { Skeleton } from '@/components/base/skeleton';
import { Badge } from '@/components/base/badge';

// ── Type styles ───────────────────────────────────────────────────────────────
const typeBadgeVariant: Record<Asset['type'], string> = {
    STOCK: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 purple:bg-blue-900/40 purple:text-blue-300',
    CRYPTO: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 purple:bg-purple-900/40 purple:text-purple-300',
    VIRTUAL_COIN: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 purple:bg-emerald-900/40 purple:text-emerald-300',
};

const avatarBg: Record<Asset['type'], string> = {
    STOCK: 'bg-blue-500',
    CRYPTO: 'bg-purple-500',
    VIRTUAL_COIN: 'bg-emerald-500',
};

const typeLabel: Record<Asset['type'], string> = {
    STOCK: 'Stock',
    CRYPTO: 'Crypto',
    VIRTUAL_COIN: 'Virtual Coin',
};

// ── Filter tabs ───────────────────────────────────────────────────────────────
type FilterTab = 'ALL' | AssetType;

const TABS: { key: FilterTab; label: string }[] = [
    { key: 'ALL', label: 'All' },
    { key: 'STOCK', label: 'Stocks' },
    { key: 'CRYPTO', label: 'Crypto' },
    { key: 'VIRTUAL_COIN', label: 'Virtual Coin' },
];

// ── Skeleton row shown while loading ─────────────────────────────────────────
const AssetRowSkeleton = () => (
    <div className="grid grid-cols-12 gap-4 items-center px-5 py-3.5">
        <div className="col-span-5 flex items-center gap-3">
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="h-4 w-32" />
        </div>
        <div className="col-span-2"><Skeleton className="h-5 w-20 rounded-full" /></div>
        <div className="col-span-3"><Skeleton className="h-4 w-28" /></div>
        <div className="col-span-2 flex justify-end"><Skeleton className="h-4 w-20" /></div>
    </div>
);

const AssetsPage = () => {
    const [activeTab, setActiveTab] = useState<FilterTab>('ALL');
    const [search, setSearch] = useState('');

    const { data: assets, isLoading, isError, error } = useQuery({
        queryKey: ['assets'],
        queryFn: getAssets,
    });

    const filtered = assets?.filter((a) => {
        const matchesTab = activeTab === 'ALL' || a.type === activeTab;
        const q = search.toLowerCase();
        const matchesSearch = !q || a.displayName.toLowerCase().includes(q) || a.euid.toLowerCase().includes(q);
        return matchesTab && matchesSearch;
    });

    return (
        <div data-page="AssetsPage" className="space-y-5">
            {/* Page header */}
            <div>
                <h1 className="text-2xl font-black text-text-base">Assets</h1>
                <p className="text-sm text-text-muted mt-0.5">
                    {isLoading ? 'Loading…' : `${assets?.length ?? 0} assets listed across all types`}
                </p>
            </div>

            {/* Error banner */}
            {isError && (
                <div className="rounded-xl border border-red-200 dark:border-red-800 purple:border-red-800 bg-red-50 dark:bg-red-950/40 purple:bg-red-950/40 p-4 text-red-600 dark:text-red-400 purple:text-red-400 text-sm">
                    Failed to load assets: {error instanceof Error ? error.message : 'Unknown error'}
                </div>
            )}

            {/* Filter bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                {/* Tabs */}
                <div className="flex items-center gap-1 bg-surface-raised rounded-lg p-1 border border-subtle">
                    {TABS.map((tab) => {
                        const count = tab.key === 'ALL'
                            ? (assets?.length ?? 0)
                            : (assets?.filter((a) => a.type === tab.key).length ?? 0);
                        const isActive = activeTab === tab.key;
                        return (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 ${isActive
                                    ? 'bg-surface text-text-base shadow-sm border border-subtle'
                                    : 'text-text-muted hover:text-text-base'
                                    }`}
                            >
                                {tab.label}
                                {!isLoading && (
                                    <span className={`text-[10px] font-mono ${isActive ? 'text-brand' : 'text-text-muted'}`}>
                                        {count}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Search */}
                <div className="relative flex-1 sm:max-w-xs">
                    <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input
                        type="text"
                        placeholder="Search by name or EUID…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 text-sm rounded-lg border border-subtle bg-surface text-text-base placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand/40 transition"
                    />
                </div>
            </div>

            {/* Table card */}
            <div className="rounded-xl border border-subtle bg-surface overflow-hidden">
                {/* Column header */}
                <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-subtle text-xs font-semibold uppercase tracking-wider text-text-muted">
                    <span className="col-span-5">Asset</span>
                    <span className="col-span-2">Type</span>
                    <span className="col-span-3">EUID</span>
                    <span className="col-span-2 text-right">Value (USD)</span>
                </div>

                {/* Loading skeletons */}
                {isLoading && (
                    <div className="divide-y divide-subtle">
                        {Array.from({ length: 6 }).map((_, i) => <AssetRowSkeleton key={i} />)}
                    </div>
                )}

                {/* Rows */}
                {!isLoading && (
                    <div className="divide-y divide-subtle">
                        {filtered?.map((asset) => (
                            <div
                                key={asset.id}
                                className="grid grid-cols-12 gap-4 items-center px-5 py-3.5 hover:bg-surface-raised transition-colors cursor-pointer"
                            >
                                <div className="col-span-5 flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full ${avatarBg[asset.type]} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                                        {asset.displayName[0]}
                                    </div>
                                    <span className="text-sm font-semibold text-text-base">{asset.displayName}</span>
                                </div>

                                <div className="col-span-2">
                                    <Badge className={typeBadgeVariant[asset.type]}>
                                        {typeLabel[asset.type]}
                                    </Badge>
                                </div>

                                <span className="col-span-3 text-xs font-mono text-text-muted truncate">{asset.euid}</span>

                                <span className="col-span-2 text-right text-sm font-bold font-mono text-text-base">
                                    ${Number(asset.value).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                </span>
                            </div>
                        ))}
                        {filtered?.length === 0 && (
                            <p className="px-5 py-10 text-center text-sm text-text-muted">
                                {search ? `No assets matching "${search}"` : 'No assets found.'}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AssetsPage;
