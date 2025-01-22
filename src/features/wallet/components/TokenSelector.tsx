import { Button } from '@/components/ui/button';
import { formatNumberWithSuffix } from '@/utils/formatNumberWithSuffix';

import { type TokenAsset } from '../utils/fetchUserTokens';
import { TokenSkeleton } from './TokenSkeleton';

interface TokenSelectorProps {
  onSelect: (token: TokenAsset) => void;
  tokens: TokenAsset[];
  isLoading: boolean;
  error: Error | null;
}

export function TokenSelector({
  onSelect,
  tokens,
  isLoading,
  error,
}: TokenSelectorProps) {
  if (isLoading) {
    return (
      <div className="space-y-0.5">
        <TokenSkeleton />
        <TokenSkeleton />
        <TokenSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-8 py-4 text-center text-red-500">
        Failed to load tokens
      </div>
    );
  }

  if (!tokens?.length) {
    return <div className="px-8 py-4 text-center">No tokens found</div>;
  }

  return (
    <div className="space-y-0.5">
      {tokens.map((token) => (
        <div key={token.tokenAddress} className="overflow-hidden">
          <Button
            variant="ghost"
            className="h-auto w-full px-8 py-4 hover:bg-accent"
            onClick={() => onSelect(token)}
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-3">
                {token.tokenImg && (
                  <img
                    src={token.tokenImg}
                    alt=""
                    className="h-10 w-10 rounded-full"
                  />
                )}
                <div className="text-left">
                  <div className="text-base font-semibold tracking-tight text-slate-900">
                    {token.tokenName}
                  </div>
                  <div className="text-sm font-medium text-slate-500">
                    {token.tokenSymbol}
                  </div>
                </div>
              </div>
              <div>
                <div className="flex gap-1 text-base font-semibold tracking-tight text-slate-500">
                  <span className="text-slate-900">
                    {token.amount.toLocaleString()}
                  </span>
                  {token.tokenSymbol}
                </div>
                <div className="text-right text-sm text-slate-500">
                  ${formatNumberWithSuffix(token.usdValue, 3, true)}
                </div>
              </div>
            </div>
          </Button>
        </div>
      ))}
    </div>
  );
}
