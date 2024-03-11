import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { createRoot } from "react-dom/client";

interface IDialog {
  title?: string;
  description?: string;
  cancelLabel?: string;
  confirmLabel?: string;
  onClose: (v) => void;
}

const DialogAction = ({ title, description, cancelLabel, confirmLabel, onClose }: IDialog) => {
  return (
    <AlertDialog open={true}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title || "Are you absolutely sure?"}</AlertDialogTitle>
          <AlertDialogDescription>
            {description || "This action cannot be undone."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onClose?.(false)}>
            {cancelLabel || "Cancel"}
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => onClose?.(true)}>
            {confirmLabel || "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

function letConfirm(props?: IDialog) {
  return new Promise((resolve) => {
    let el = document.createElement("div");
    const root = createRoot(el);
    const handleResolve = (result) => {
      root.unmount();
      el.remove();
      resolve(result);
    };
    root.render(<DialogAction {...props} onClose={handleResolve} />);
  });
}

export default letConfirm;
