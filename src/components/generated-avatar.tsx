import { createAvatar } from '@dicebear/core';
import { botttsNeutral, initials } from '@dicebear/collection';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';

interface GeneratedAvatarProps {
  seed: string;
  variant: 'botttsNeutral' | 'initials';
  className?: string;
}

export function GeneratedAvatar({ seed, variant, className }: GeneratedAvatarProps) {
  const style = variant === 'botttsNeutral' ? botttsNeutral : initials;

  const avatar = createAvatar(style, { seed });

  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={avatar.toDataUri()} alt="Avatar generado" />
      <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}
