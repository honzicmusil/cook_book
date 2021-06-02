import { createAction, props } from '@ngrx/store';
import { Message } from 'primeng/api';

const showToast = createAction(
  '[toast] Show message',
  props<{
    message: Message;
  }>()
);

// const toastActionsDescripor = 'show toast message';

// function createToastObj(title: string, content: string, cssClass: string) {
//   return {
//     toast: {
//       title,
//       content,
//       cssClass,
//     } as ToastModel,
//   };
// }

// const showToastMessage = createAction(
//   toastActionsDescripor,
//   props<{ toast: ToastModel }>()
// );

// const showToastSuccess = createAction(
//   toastActionsDescripor,
//   (title = 'Success', content: string) =>
//     createToastObj(title, content, 'e-toast-success')
// );

// const showToastWarning = createAction(
//   toastActionsDescripor,
//   (title = 'Warning', content: string) =>
//     createToastObj(title, content, 'e-toast-warning')
// );

// const showToastInfo = createAction(
//   toastActionsDescripor,
//   (title = 'Info', content: string) =>
//     createToastObj(title, content, 'e-toast-info')
// );

// /**
//  * Returns the sum of a and b
//  * @param {string} title = 'Saved'
//  * @param {string} content = 'All data were saved'
//  * @returns {string}
//  */
// const showToastSaved = createAction(
//   toastActionsDescripor,
//   (title = 'Saved', content = 'All data were saved') =>
//     createToastObj(title, content, 'e-toast-success')
// );

// /**
//  * For FE errors
//  * @param {string} title = 'Error'
//  * @param {string} content = details null
//  * @returns {string}
//  */
// const showToastError = createAction(
//   toastActionsDescripor,
//   (title = 'Error', content: string) =>
//     createToastObj(title, content, 'e-toast-danger')
// );

// /**
//  * For errors returned by server
//  * @param serverErrObj UserFriendlyException?
//  */
// const showToastApiError = createAction(
//   toastActionsDescripor,
//   (serverErrObj: { code: string; details: string; message: string }) =>
//     createToastObj(
//       serverErrObj && serverErrObj.details
//         ? serverErrObj.message
//         : 'Server returns error',
//       serverErrObj && serverErrObj.details
//         ? serverErrObj.details
//         : serverErrObj && serverErrObj.message,
//       'e-toast-danger'
//     )
// );

export const ToastActions = {
  showToast,
  // showToastMessage,
  // showToastSuccess,
  // showToastWarning,
  // showToastInfo,
  // showToastError,
  // showToastSaved,
  // showToastApiError,
};

export const successToast: Message = {
  severity: 'success',
  summary: 'Success!',
};

export const errorToast: Message = {
  severity: 'error',
  summary: 'Error!',
};

export const warningToast: Message = {
  severity: 'warn',
  summary: 'Warning!',
};

export const RalbaToasts = {
  warningToast,
  successToast,
  errorToast,
};
