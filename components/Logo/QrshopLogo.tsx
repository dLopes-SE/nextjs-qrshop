import { Group, Image } from '@mantine/core';

type QrshopLogoProps = {
  size?: number; 
};

const QrshopLogo = ({ size = 32 }: QrshopLogoProps) => {  return (
    <Group align="center" gap={8}>
      <Image
        src="/favicon.svg"
        alt="QR Shop Logo"
        width={size}
        height={size}
        fit="contain"
      />
    </Group>
  );
};

export default QrshopLogo;