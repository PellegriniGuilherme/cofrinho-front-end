import { useAccount } from "@/stores/account";
import { sensibleValue } from "@/utils/sensitiveValue";
import { Card, CardContent, CardHeader, CardTitle, cn, Heading, Text } from "@pellegrinidev/piggy-ui";

interface ValueCardProps {
  title: string;
  classColor?: string;
  value: number;
  description: string;
}

const ValueCard: React.FC<ValueCardProps> = ({ title, classColor, value, description }) => {
  const show = useAccount((s) => s.showValues);

  return (
    <Card className='border-brand-100 border'>
      <CardHeader className="pb-2">
        <CardTitle className={cn(['flex text-neutral-900 justify-between items-center', classColor])}>
          {title}
        </CardTitle>
        <CardTitle>
          <Heading size='2xl' className={cn(['text-neutral-900 break-all', classColor])}>
            {sensibleValue(value, show)}
          </Heading>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Text size='xs' className={cn(['text-neutral-500', classColor])}>
          {description}
        </Text>
      </CardContent>
    </Card>
  );
};

export default ValueCard;