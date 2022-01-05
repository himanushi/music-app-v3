import { JSX as LocalJSX } from "@ionic/core";

declare global {
  declare namespace svelte.JSX {
    interface IntrinsicElements {
      "ion-accordion": LocalJSX.IonAccordion &
        svelte.JSX.HTMLProps<HTMLElement>;
      "ion-accordion-group": LocalJSX.IonAccordionGroup &
        svelte.JSX.HTMLProps<HTMLElement>;
      "ion-action-sheet": LocalJSX.IonActionSheet &
        svelte.JSX.HTMLProps<HTMLElement>;
      "ion-alert": LocalJSX.IonAlert & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-app": LocalJSX.IonApp & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-avatar": LocalJSX.IonAvatar & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-back-button": LocalJSX.IonBackButton &
        svelte.JSX.HTMLProps<HTMLElement>;
      "ion-backdrop": LocalJSX.IonBackdrop & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-badge": LocalJSX.IonBadge & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-breadcrumb": LocalJSX.IonBreadcrumb &
        svelte.JSX.HTMLProps<HTMLElement>;
      "ion-breadcrumbs": LocalJSX.IonBreadcrumbs &
        svelte.JSX.HTMLProps<HTMLElement>;
      "ion-button": LocalJSX.IonButton & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-buttons": LocalJSX.IonButtons & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-card": LocalJSX.IonCard & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-card-content": LocalJSX.IonCardContent &
        svelte.JSX.HTMLProps<HTMLElement>;
      "ion-card-header": LocalJSX.IonCardHeader &
        svelte.JSX.HTMLProps<HTMLElement>;
      "ion-card-subtitle": LocalJSX.IonCardSubtitle &
        svelte.JSX.HTMLProps<HTMLElement>;
      "ion-card-title": LocalJSX.IonCardTitle &
        svelte.JSX.HTMLProps<HTMLElement>;
      "ion-checkbox": LocalJSX.IonCheckbox & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-chip": LocalJSX.IonChip & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-col": LocalJSX.IonCol & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-content": LocalJSX.IonContent & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-datetime": LocalJSX.IonDatetime & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-fab": LocalJSX.IonFab & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-fab-button": LocalJSX.IonFabButton &
        svelte.JSX.HTMLProps<HTMLElement>;
      "ion-fab-list": LocalJSX.IonFabList & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-footer": LocalJSX.IonFooter & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-grid": LocalJSX.IonGrid & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-header": LocalJSX.IonHeader & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-img": LocalJSX.IonImg & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-infinite-scroll": LocalJSX.IonInfiniteScroll &
        svelte.JSX.HTMLProps<HTMLElement>;
      "ion-infinite-scroll-content": LocalJSX.IonInfiniteScrollContent &
        svelte.JSX.HTMLProps<HTMLElement>;
      "ion-input": LocalJSX.IonInput & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-item": LocalJSX.IonItem & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-item-divider": LocalJSX.IonItemDivider &
        svelte.JSX.HTMLProps<HTMLElement>;
      "ion-item-group": LocalJSX.IonItemGroup &
        svelte.JSX.HTMLProps<HTMLElement>;
      "ion-item-option": LocalJSX.IonItemOption &
        svelte.JSX.HTMLProps<HTMLElement>;
      "ion-item-options": LocalJSX.IonItemOptions &
        svelte.JSX.HTMLProps<HTMLElement>;
      "ion-item-sliding": LocalJSX.IonItemSliding &
        svelte.JSX.HTMLProps<HTMLElement>;
      "ion-label": LocalJSX.IonLabel & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-list": LocalJSX.IonList & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-list-header": LocalJSX.IonListHeader &
        svelte.JSX.HTMLProps<HTMLElement>;
      "ion-loading": LocalJSX.IonLoading & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-menu": LocalJSX.IonMenu & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-menu-button": LocalJSX.IonMenuButton &
        svelte.JSX.HTMLProps<HTMLElement>;
      "ion-menu-toggle": LocalJSX.IonMenuToggle &
        svelte.JSX.HTMLProps<HTMLElement>;
      "ion-modal": LocalJSX.IonModal & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-nav": LocalJSX.IonNav & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-nav-link": LocalJSX.IonNavLink & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-note": LocalJSX.IonNote & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-picker": LocalJSX.IonPicker & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-picker-column": LocalJSX.IonPickerColumn &
        svelte.JSX.HTMLProps<HTMLElement>;
      "ion-picker-column-internal": LocalJSX.IonPickerColumnInternal &
        svelte.JSX.HTMLProps<HTMLElement>;
      "ion-picker-internal": LocalJSX.IonPickerInternal &
        svelte.JSX.HTMLProps<HTMLElement>;
      "ion-popover": LocalJSX.IonPopover & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-progress-bar": LocalJSX.IonProgressBar &
        svelte.JSX.HTMLProps<HTMLElement>;
      "ion-radio": LocalJSX.IonRadio & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-radio-group": LocalJSX.IonRadioGroup &
        svelte.JSX.HTMLProps<HTMLElement>;
      "ion-range": LocalJSX.IonRange & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-refresher": LocalJSX.IonRefresher &
        svelte.JSX.HTMLProps<HTMLElement>;
      "ion-refresher-content": LocalJSX.IonRefresherContent &
        svelte.JSX.HTMLProps<HTMLElement>;
      "ion-reorder": LocalJSX.IonReorder & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-reorder-group": LocalJSX.IonReorderGroup &
        svelte.JSX.HTMLProps<HTMLElement>;
      "ion-ripple-effect": LocalJSX.IonRippleEffect &
        svelte.JSX.HTMLProps<HTMLElement>;
      "ion-route": LocalJSX.IonRoute & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-route-redirect": LocalJSX.IonRouteRedirect &
        svelte.JSX.HTMLProps<HTMLElement>;
      "ion-router": LocalJSX.IonRouter & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-router-link": LocalJSX.IonRouterLink &
        svelte.JSX.HTMLProps<HTMLElement>;
      "ion-router-outlet": LocalJSX.IonRouterOutlet &
        svelte.JSX.HTMLProps<HTMLElement>;
      "ion-row": LocalJSX.IonRow & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-searchbar": LocalJSX.IonSearchbar &
        svelte.JSX.HTMLProps<HTMLElement>;
      "ion-segment": LocalJSX.IonSegment & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-segment-button": LocalJSX.IonSegmentButton &
        svelte.JSX.HTMLProps<HTMLElement>;
      "ion-select": LocalJSX.IonSelect & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-select-option": LocalJSX.IonSelectOption &
        svelte.JSX.HTMLProps<HTMLElement>;
      "ion-select-popover": LocalJSX.IonSelectPopover &
        svelte.JSX.HTMLProps<HTMLElement>;
      "ion-skeleton-text": LocalJSX.IonSkeletonText &
        svelte.JSX.HTMLProps<HTMLElement>;
      "ion-slide": LocalJSX.IonSlide & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-slides": LocalJSX.IonSlides & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-spinner": LocalJSX.IonSpinner & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-split-pane": LocalJSX.IonSplitPane &
        svelte.JSX.HTMLProps<HTMLElement>;
      "ion-tab": LocalJSX.IonTab & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-tab-bar": LocalJSX.IonTabBar & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-tab-button": LocalJSX.IonTabButton &
        svelte.JSX.HTMLProps<HTMLElement>;
      "ion-tabs": LocalJSX.IonTabs & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-text": LocalJSX.IonText & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-textarea": LocalJSX.IonTextarea & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-thumbnail": LocalJSX.IonThumbnail &
        svelte.JSX.HTMLProps<HTMLElement>;
      "ion-title": LocalJSX.IonTitle & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-toast": LocalJSX.IonToast & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-toggle": LocalJSX.IonToggle & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-toolbar": LocalJSX.IonToolbar & svelte.JSX.HTMLProps<HTMLElement>;
      "ion-virtual-scroll": LocalJSX.IonVirtualScroll &
        svelte.JSX.HTMLProps<HTMLElement>;
    }
  }
}
