import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Wallet, TrendingUp, Layers } from 'lucide-react';
import { getWallet } from '@/api/wallets.api';
import { Skeleton } from '@/components/base/skeleton';
import { Badge } from '@/components/base/badge';
import type { AssetType } from '@/types';
import { Button } from '@/components/base/button';

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmt = (n: number) =>
    '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const typeBadgeClass: Record<AssetType, string> = {
    STOCK: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 purple:bg-blue-900/40 purple:text-blue-300',
    CRYPTO: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 purple:bg-purple-900/40 purple:text-purple-300',
    VIRTUAL_COIN: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 purple:bg-emerald-900/40 purple:text-emerald-300',
};

const avatarBg: Record<AssetType, string> = {
    STOCK: 'bg-blue-500',
    CRYPTO: 'bg-purple-500',
    VIRTUAL_COIN: 'bg-emerald-500',
};

// ── Skeleton row ──────────────────────────────────────────────────────────────
const RowSkeleton = () => (
    <div className="grid grid-cols-12 gap-4 items-center px-5 py-4">
        <div className="col-span-4 flex items-center gap-3">
            <Skeleton className="w-9 h-9 rounded-full" />
            <div className="space-y-1.5">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-16" />
            </div>
        </div>
        <div className="col-span-2"><Skeleton className="h-5 w-16 rounded-full" /></div>
        <div className="col-span-2 flex justify-end"><Skeleton className="h-4 w-12" /></div>
        <div className="col-span-2 flex justify-end"><Skeleton className="h-4 w-20" /></div>
        <div className="col-span-2 flex justify-end"><Skeleton className="h-4 w-20" /></div>
    </div>
);

// ── Page ──────────────────────────────────────────────────────────────────────
const WalletDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: wallet, isLoading, isError } = useQuery({
        queryKey: ['wallet', id],
        queryFn: () => getWallet(id!),
        enabled: !!id,
    });

    const holdings = wallet?.walletAssets ?? [];
    const totalValue = holdings.reduce((s, wa) => s + Number(wa.asset.value) * wa.quantity, 0);
    const assetCount = holdings.length;

    return (
        <div data-page="WalletDetailPage" className="space-y-6">
            {/* Back button + header */}
            <div className="flex items-start gap-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/wallets')}
                    className="mt-0.5 gap-1.5 shrink-0"
                >
                    <ArrowLeft size={14} /> Wallets
                </Button>
                <div>
                    {isLoading
                        ? <Skeleton className="h-7 w-48 mb-1" />
                        : <h1 className="text-2xl font-black text-text-base">{wallet?.displayName}</h1>
                    }
                    <p className="text-sm text-text-muted mt-0.5">Wallet holdings &amp; breakdown</p>
                </div>
            </div>

            {/* Error */}
            {isError && (
                <div className="rounded-xl border border-red-200 bg-red-50 dark:bg-red-950/40 dark:border-red-800 p-4 text-sm text-red-600 dark:text-red-400">
                    Failed to load wallet.
                </div>
            )}

            {/* Summary strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                    { label: 'Total Value', value: isLoading ? null : fmt(totalValue), icon: <TrendingUp size={14} /> },
                    { label: 'Holdings', value: isLoading ? null : `${assetCount} asset${assetCount !== 1 ? 's' : ''}`, icon: <Layers size={14} /> },
                    { label: 'Wallet ID', value: isLoading ? null : wallet?.id.slice(0, 12) + '…', icon: <Wallet size={14} /> },
                ].map(({ label, value, icon }) => (
                    <div key={label} className="rounded-xl border border-subtle bg-surface p-4 space-y-2">
                        <div className="flex items-center gap-1.5 text-xs text-text-muted">
                            {icon} {label}
                        </div>
                        {value === null
                            ? <Skeleton className="h-6 w-32" />
                            : <p className="text-lg font-black text-text-base font-mono">{value}</p>
                        }
                    </div>
                ))}
            </div>

            {/* Holdings table */}
            <div className="rounded-xl border border-subtle bg-surface overflow-hidden">
                {/* Column headers */}
                <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-subtle text-xs font-semibold uppercase tracking-wider text-text-muted">
                    <span className="col-span-4">Asset</span>
                    <span className="col-span-2">Type</span>
                    <span className="col-span-2 text-right">Quantity</span>
                    <span className="col-span-2 text-right">Unit Price</span>
                    <span className="col-span-2 text-right">Total Value</span>
                </div>

                <div className="divide-y divide-subtle">
                    {/* Loading */}
                    {isLoading && Array.from({ length: 4 }).map((_, i) => <RowSkeleton key={i} />)}

                    {/* Empty */}
                    {!isLoading && holdings.length === 0 && (
                        <p className="px-5 py-10 text-center text-sm text-text-muted">
                            This wallet has no holdings yet.
                        </p>
                    )}

                    {/* Rows */}
                    {!isLoading && [...holdings]
                        .sort((a, b) => Number(b.asset.value) * b.quantity - Number(a.asset.value) * a.quantity)
                        .map((wa) => {
                            const rowTotal = Number(wa.asset.value) * wa.quantity;
                            return (
                                <div
                                    key={wa.id}
                                    className="grid grid-cols-12 gap-4 items-center px-5 py-4 hover:bg-surface-raised transition-colors"
                                >
                                    {/* Asset name */}
                                    <div className="col-span-4 flex items-center gap-3">
                                        <div className={`w-9 h-9 rounded-full ${avatarBg[wa.asset.type]} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                                            {wa.asset.displayName[0]}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-text-base leading-tight">{wa.asset.displayName}</p>
                                            <p className="text-xs text-text-muted font-mono">{wa.asset.euid}</p>
                                        </div>
                                    </div>

                                    {/* Type badge */}
                                    <div className="col-span-2">
                                        <Badge className={typeBadgeClass[wa.asset.type]}>{wa.asset.type}</Badge>
                                    </div>

                                    {/* Quantity */}
                                    <p className="col-span-2 text-right text-sm font-mono text-text-base">
                                        {wa.quantity.toLocaleString('en-US')}
                                    </p>

                                    {/* Unit price */}
                                    <p className="col-span-2 text-right text-sm font-mono text-text-muted">
                                        {fmt(Number(wa.asset.value))}
                                    </p>

                                    {/* Total */}
                                    <p className="col-span-2 text-right text-sm font-bold font-mono text-text-base">
                                        {fmt(rowTotal)}
                                    </p>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default WalletDetailPage;
