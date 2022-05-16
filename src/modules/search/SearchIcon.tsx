import {
  forwardRef,
  IconButton,
  IconButtonProps,
  Image,
  useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { getResource } from '@common/storage/resource';

type SearchIconProps = Partial<IconButtonProps> & {
  src?: string;
};

const SearchIcon = forwardRef<SearchIconProps, 'div'>(
  ({ src: resourceId, ...props }: SearchIconProps, ref) => {
    const [src, setSrc] = useState<string>();

    const bgColor = useColorModeValue('gray.100', 'gray.800');

    useEffect(() => {
      getResource(resourceId ?? '').then(setSrc);
    }, [resourceId]);

    return (
      <IconButton
        aria-label="SearchEngine"
        border="solid"
        bgColor={bgColor}
        _hover={{
          borderColor: 'gray.300',
        }}
        {...props}
        ref={ref}
      >
        <Image src={src} />
      </IconButton>
    );
  },
);

export default SearchIcon;
