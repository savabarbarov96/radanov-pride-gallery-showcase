import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { useLanguage } from "@/hooks/useLanguage";

export default function ContainerTextFlipDemo() {
  const { t } = useLanguage();
  
  return (
    <ContainerTextFlip
      words={t('hero.flipWords') as string[]}
      interval={2500}
      className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-playfair font-light leading-tight px-4 py-2 md:px-6 md:py-3"
      textClassName="font-light text-slate-800 dark:text-white"
      animationDuration={800}
    />
  );
} 