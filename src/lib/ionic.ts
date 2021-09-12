import {
  modalController,
  popoverController,
  toastController
} from "@ionic/core";
import type { ToastOptions } from "@ionic/core";

export const openMenu = (name: string) => async (event: any) => {

  const popover = await popoverController.create({
    component: name,
    event
  });
  await popover.present();

};

export const closeMenu = async () => {

  await popoverController.dismiss();

};

export const isOpenModal = () => Boolean(document.querySelector("ion-modal"));

export const openModal = async (
  component: HTMLElement,
  componentProps?: Record<string, any>
) => {

  const modal = await modalController.create({
    component,
    componentProps
  });
  await modal.present();

};

export const closeModal = async () => {

  if (isOpenModal()) {

    await modalController.dismiss();

  }

};

export const closeSidebar = () => {

  const sidebar = document.querySelector("#sidebar");
  if (sidebar) {

    sidebar.close();

  }

};

export const openToast = async (props: ToastOptions) => {

  const defaultProps: ToastOptions = {
    buttons: [
      {
        handler: () => true,
        text: "OK"
      }
    ],
    cssClass: "tabs-bottom",
    position: "bottom"
  };

  const toast = await toastController.create({
    ...defaultProps,
    ...props
  });
  await toast.present();

};
