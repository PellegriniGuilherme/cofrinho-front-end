import { toast } from "@pellegrinidev/piggy-ui";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AlertDispatch {
  status: string;
  message: string;
  data: Record<string, any>;
}

const alertDispatch = (response: AlertDispatch) => {
  if(!response?.data?.alert) {
    return null
  }

  const message = response.message;
  const type = response.status;
  if(type === 'success'){
    toast.success(message)
  }else {
    toast.error(message);
  } 
};

export default alertDispatch;