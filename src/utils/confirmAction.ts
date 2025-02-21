import swal from "sweetalert";
import { SwalOptions } from "sweetalert/typings/modules/options";

interface IParams extends Partial<SwalOptions> {
  title: string;
  text: string;
  icon?: "success" | "error" | "warning" | "info";
  buttons?: [string, string];
  successText?: string;
  errorText?: string;
  callback: () => Promise<void>;
}

const confirmAction = ({
  title,
  text,
  buttons = ["Cancel", "Yes"],
  successText,
  errorText,
  callback,
  ...props
}: IParams) => {
  swal({
    ...props,
    title,
    text,
    buttons,
  }).then(async value => {
    if (value) {
      try {
        await callback();
        // XXX can be changed to a toast
        swal({
          text: successText,
          icon: "success",
          timer: 2000,
        });
      } catch (error) {
        swal({
          text: errorText || (error as Error).message,
          icon: "error",
          timer: 3000,
        });
      }
    }
  });
};

export default confirmAction;
