import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import IconCreator from '@common/components/IconCreator';
import { useDispatch } from '@common/hooks';
import { addCustomSearchEngine } from '@modules/search/searchSlice';

type CustomEngineFormFields = {
  name: string;
  url: string;
  icon: Blob;
};

const SearchConfigCustomEngine = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    reset,
  } = useForm<CustomEngineFormFields>();

  const onSubmit = async () => {
    const data = getValues();
    dispatch(
      addCustomSearchEngine({
        name: data.name,
        url: data.url,
        icon: data.icon,
      }),
    );
    reset();
  };

  return (
    <>
      <Heading size="xs">{t`search.custom`}</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={Boolean(errors.name)}>
          <FormLabel>{t`search.name`}</FormLabel>
          <Input
            autoComplete="off"
            {...register('name', {
              required: 'name is required',
            })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.url)}>
          <FormLabel>{t`search.url`}</FormLabel>
          <Input
            autoComplete="off"
            {...register('url', {
              required: 'url is required',
              validate: {
                url: (value) => {
                  if (!value) return true;
                  if (value.match(/%s/)) return true;
                  return 'url must contain %s';
                },
              },
            })}
          />
          <FormErrorMessage>
            {errors.url && errors.url.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.icon)}>
          <FormLabel>{t`search.icon`}</FormLabel>
          <IconCreator
            name="icon"
            control={control}
            rules={{
              required: 'icon is required',
            }}
          />
        </FormControl>
        <Button mt={4} type="submit">
          {t`search.submit`}
        </Button>
      </form>
    </>
  );
};

export default SearchConfigCustomEngine;
