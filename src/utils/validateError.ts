/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from '@pellegrinidev/piggy-ui';
import { UseFormSetError, FieldValues, Path } from 'react-hook-form';

interface LaravelValidationError<TFields extends FieldValues> {
  status: 'error';
  message: string;
  alert?: boolean;
  validation?: boolean;
  errors?: Partial<Record<Path<TFields>, string[]>> & {
    alert?: boolean;
  };
}

export function validateError<TFields extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<TFields>
): void {
  if (
    typeof error !== 'object' ||
    error === null ||
    !('response' in error) ||
    typeof (error as any).response?.data !== 'object'
  ) {
    return;
  }

  const response = (error as { response: { data: LaravelValidationError<TFields> } }).response.data;

  if (response.errors?.alert && response.message) {
    toast.error(response.message);
  }

  if (response.validation && response.errors) {
    for (const field in response.errors) {
      if (field === 'alert') continue;
      const messages = response.errors[field as Path<TFields>];
      if (messages && messages.length > 0) {
        setError(field as Path<TFields>, {
          type: 'manual',
          message: messages.join(' '),
        });
      }
    }
  }

  if (!response.validation && response.message) {
    setError('root' as Path<TFields>, {
      type: 'manual',
      message: response.message,
    });
  }
}
