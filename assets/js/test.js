function ModalAlert(message, type) {
    var modal = document.querySelector('.modalAlert');
    modal.innerHTML = `
    <div 
        class="col-xs-11 col-sm-4 alert alert-${type} alert-with-icon animated fadeInDown"
        data-notify="container" 
        data-notify-position="top-right"
        role="alert" 
        style="display: inline-block; margin: 0px auto; position: fixed; transition: all 0.5s ease-in-out 0s; z-index: 1031; top: 20px; right: 20px;">
        <span data-notify="icon" class="pe-7s-bell"></span> 
        <span data-notify="title"></span> 
        <span data-notify="message">
            ${message}
        </span>
    </div>
    `;
    setTimeout(() => {
        modal.style.opacity = 0;
        modal.style.opacity = 1;
    }, 2500)
}