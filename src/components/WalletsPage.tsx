import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Plus, Wallet, ArrowUpRight, Layers } from 'lucide-react';
import { getWallets, createWallet } from '@/api/wallets.api';
import { Skeleton } from '@/components/base/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/base/dialog';
import { Input } from '@/components/base/input';
import { Label } from '@/components/base/label';
import { Button } from '@/components/base/button';
import { toast } from 'sonner';

const fmt = (n: number) =>
    '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// ── Skeleton card ─────────────────────────────────────────────────────────────
const WalletCardSkeleton = () => (
    <div className="rounded-xl border border-subtle bg-surface p-5 space-y-4">
        <div className="flex items-start justify-between">
            <Skeleton className="w-10 h-10 rounded-xl" />
            <Skeleton className="w-4 h-4" />
        </div>
        <Skeleton className="h-5 w-36" />
        <div className="space-y-2">
            <Skeleton className="h-3.5 w-28" />
            <Skeleton className="h-3.5 w-20" />
        </div>
        <div className="flex items-center justify-between pt-1 border-t border-subtle">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-16" />
        </div>
    </div>
);

const WalletsPage = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');

    const { data: wallets, isLoading, isError, error } = useQuery({
        queryKey: ['wallets'],
        queryFn: getWallets,
    });

    const { mutate: addWallet, isPending } = useMutation({
        mutationFn: () => createWallet({ displayName: name, userId: 'TODO' }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wallets'] });
            toast.success('Wallet created!');
            setOpen(false);
            setName('');
        },
        onError: (err) => {
            toast.error(err instanceof Error ? err.message : 'Failed to create wallet');
        },
    });

    return (
        <div data-page="WalletsPage" className="space-y-5">
            {/* Page header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-text-base">Wallets</h1>
                    <p className="text-sm text-text-muted mt-0.5">
                        {isLoading ? 'Loading…' : `${wallets?.length ?? 0} wallet${wallets?.length !== 1 ? 's' : ''} in your account`}
                    </p>
                </div>
                <Button onClick={() => setOpen(true)} className="bg-brand hover:bg-brand-hover text-on-brand gap-2">
                    <Plus size={15} />
                    New Wallet
                </Button>
            </div>

            {/* Error banner */}
            {isError && (
                <div className="rounded-xl border border-red-200 dark:border-red-800 purple:border-red-800 bg-red-50 dark:bg-red-950/40 purple:bg-red-950/40 p-4 text-red-600 dark:text-red-400 purple:text-red-400 text-sm">
                    Failed to load wallets: {error instanceof Error ? error.message : 'Unknown error'}
                </div>
            )}

            {/* Loading skeletons */}
            {isLoading && (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => <WalletCardSkeleton key={i} />)}
                </div>
            )}

            {/* Empty state */}
            {!isLoading && wallets?.length === 0 && (
                <div className="rounded-xl border border-dashed border-subtle p-12 text-center">
                    <Wallet size={32} className="mx-auto text-text-muted mb-3" />
                    <p className="text-sm font-medium text-text-muted">No wallets yet</p>
                    <p className="text-xs text-text-muted mt-1">Create your first wallet to start tracking assets</p>
                </div>
            )}

            {/* Wallet cards */}
            {!isLoading && wallets && wallets.length > 0 && (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {wallets.map((wallet) => {
                        const assetCount = wallet.walletAssets?.length ?? 0;
                        const totalValue = wallet.walletAssets?.reduce(
                            (sum, wa) => sum + Number(wa.asset.value) * wa.quantity, 0,
                        ) ?? 0;
                        const topAsset = wallet.walletAssets?.sort(
                            (a, b) => Number(b.asset.value) * b.quantity - Number(a.asset.value) * a.quantity,
                        )[0];

                        return (
                            <div
                                key={wallet.id}
                                data-component="WalletCard"
                                onClick={() => navigate(`/wallets/${wallet.id}`)}
                                className="group rounded-xl border border-subtle bg-surface p-5 hover:border-brand transition-colors cursor-pointer space-y-4"
                            >
                                {/* Card header */}
                                <div className="flex items-start justify-between">
                                    <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center text-brand">
                                        <Wallet size={18} />
                                    </div>
                                    <ArrowUpRight size={16} className="text-text-muted group-hover:text-brand transition-colors mt-0.5" />
                                </div>

                                {/* Name + total value */}
                                <div>
                                    <p className="text-base font-bold text-text-base">{wallet.displayName}</p>
                                    <p className="text-xl font-black text-text-base mt-0.5">{fmt(totalValue)}</p>
                                </div>

                                {/* Stats */}
                                <div className="flex items-center gap-4 text-xs text-text-muted">
                                    <span className="flex items-center gap-1">
                                        <Layers size={11} />
                                        {assetCount} asset{assetCount !== 1 ? 's' : ''}
                                    </span>
                                    {topAsset && (
                                        <span className="truncate">
                                            Top: <span className="font-semibold text-text-base">{topAsset.asset.displayName}</span>
                                        </span>
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="pt-3 border-t border-subtle flex items-center justify-between text-xs text-text-muted">
                                    <span>Created {new Date(wallet.createdAt).toLocaleDateString()}</span>
                                    <span className="font-mono truncate ml-2 max-w-25">{wallet.id.slice(0, 8)}…</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* New Wallet dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create a new wallet</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-3 py-2">
                        <Label htmlFor="wallet-name">Wallet name</Label>
                        <Input
                            id="wallet-name"
                            placeholder="e.g. My BTC Wallet"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && name.trim() && addWallet()}
                        />
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button
                            onClick={() => addWallet()}
                            disabled={!name.trim() || isPending}
                            className="bg-brand hover:bg-brand-hover text-on-brand"
                        >
                            {isPending ? 'Creating…' : 'Create wallet'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default WalletsPage;
