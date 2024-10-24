import toastr from "toastr";

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

export const showMessage = (type, message, title) => {
    return toastr[type](message, title);
}

export const errorMessage = (message) =>{
    showMessage('error', message, 'Erro')
}
export const messageSuccess = (message) =>{
    showMessage('success', message, 'Sucesso')
}
export const messageAlert = (message) =>{
    showMessage('warning', message, 'Alerta')
}