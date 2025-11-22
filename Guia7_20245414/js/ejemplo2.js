const formulario = document.forms["frmRegistro"];
const button = document.forms["frmRegistro"].elements["btnRegistro"];
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});
const bodyModal = document.getElementById("idBodyModal");

const validarEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@].[^\s@]+$/;
    return emailRegex.test(email);
};

const validarFecha = (fecha) => {
    const fechaIngresada = new Date(fecha);
    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);
    return fechaIngresada <= fechaActual;
};

const mostrarAlerta = (mensaje) => {
    alert(mensaje);
};

const validarFormularioCompleto = () => {
    const nombre = document.getElementById("idNombre");
    const apellidos = document.getElementById("idApellidos");
    const fechaNacimiento = document.getElementById("idFechaNac");
    const correo = document.getElementById("idCorreo");
    const password = document.getElementById("idPassword");
    const passwordRepetir = document.getElementById("idPasswordRepetir");
    
    if (nombre.value.trim() === "") {
        mostrarAlerta("El campo Nombre es obligatorio");
        nombre.focus();
        return false;
    }
    
    if (apellidos.value.trim() === "") {
        mostrarAlerta("El campo Apellidos es obligatorio");
        apellidos.focus();
        return false;
    }
    
    if (fechaNacimiento.value === "") {
        mostrarAlerta("El campo Fecha de Nacimiento es obligatorio");
        fechaNacimiento.focus();
        return false;
    }
    if (!validarFecha(fechaNacimiento.value)) {
        mostrarAlerta("La fecha de nacimiento no puede ser mayor a la fecha actual");
        fechaNacimiento.focus();
        return false;
    }
    
    if (correo.value.trim() === "") {
        mostrarAlerta("El campo Correo Electrónico es obligatorio");
        correo.focus();
        return false;
    }
    if (!validarEmail(correo.value.trim())) {
        mostrarAlerta("El formato del correo electrónico no es válido");
        correo.focus();
        return false;
    }
    
    if (password.value === "") {
        mostrarAlerta("El campo Contraseña es obligatorio");
        password.focus();
        return false;
    }
    
    if (passwordRepetir.value === "") {
        mostrarAlerta("Debe repetir la contraseña");
        passwordRepetir.focus();
        return false;
    }
    
    if (password.value !== passwordRepetir.value) {
        mostrarAlerta("Las contraseñas no coinciden");
        passwordRepetir.focus();
        return false;
    }
    
    const checkProgramacion = document.getElementById("idCkProgramacion");
    const checkBD = document.getElementById("idCkBD");
    const checkRedes = document.getElementById("idCkRedes");
    const checkSeguridad = document.getElementById("idCkSeguridad");
    
    let interesesSeleccionados = [];
    if (checkProgramacion.checked) interesesSeleccionados.push("Programación");
    if (checkBD.checked) interesesSeleccionados.push("Base de Datos");
    if (checkRedes.checked) interesesSeleccionados.push("Inteligencia Artificial");
    if (checkSeguridad.checked) interesesSeleccionados.push("Seguridad Informática");
    
    if (interesesSeleccionados.length === 0) {
        mostrarAlerta("Debe seleccionar al menos un interés");
        return false;
    }
    
    const radioIng = document.getElementById("idRdIng");
    const radioLic = document.getElementById("idRdLic");
    const radioTec = document.getElementById("idRdTec");
    const radioOtro = document.getElementById("idRdOtro");
    
    let carreraSeleccionada = "";
    if (radioIng.checked) carreraSeleccionada = "Ingeniería de Software y Negocios Digitales";
    else if (radioLic.checked) carreraSeleccionada = "Licenciatura en Economía y Negocios";
    else if (radioTec.checked) carreraSeleccionada = "Ingeniería de Negocios";
    else if (radioOtro.checked) carreraSeleccionada = "Otra";
    
    if (carreraSeleccionada === "") {
        mostrarAlerta("Debe seleccionar una carrera");
        return false;
    }
    
    const selectPais = document.getElementById("idCmPais");
    const paisSeleccionado = selectPais.value;
    
    if (paisSeleccionado === "Seleccione una opcion" || paisSeleccionado === "") {
        mostrarAlerta("Debe seleccionar un país de origen");
        selectPais.focus();
        return false;
    }
    
    return {
        nombre: nombre.value.trim(),
        apellidos: apellidos.value.trim(),
        fechaNacimiento: fechaNacimiento.value,
        correo: correo.value.trim(),
        intereses: interesesSeleccionados.join(", "),
        carrera: carreraSeleccionada,
        pais: selectPais.options[selectPais.selectedIndex].text
    };
};

const crearTablaConDatosFormulario = (datos) => {
    bodyModal.innerHTML = "";
    
    const tabla = document.createElement("table");
    tabla.className = "table table-striped table-bordered";
    
    const thead = document.createElement("thead");
    const trHead = document.createElement("tr");
    
    const thCampo = document.createElement("th");
    const textoCampo = document.createTextNode("Campo");
    thCampo.appendChild(textoCampo);
    
    const thValor = document.createElement("th");
    const textoValor = document.createTextNode("Valor");
    thValor.appendChild(textoValor);
    
    trHead.appendChild(thCampo);
    trHead.appendChild(thValor);
    thead.appendChild(trHead);
    tabla.appendChild(thead);
    
    const tbody = document.createElement("tbody");
    
    const campos = [
        { etiqueta: "Nombre", valor: datos.nombre },
        { etiqueta: "Apellidos", valor: datos.apellidos },
        { etiqueta: "Fecha de Nacimiento", valor: datos.fechaNacimiento },
        { etiqueta: "Correo Electrónico", valor: datos.correo },
        { etiqueta: "Intereses", valor: datos.intereses },
        { etiqueta: "Carrera", valor: datos.carrera },
        { etiqueta: "País de Origen", valor: datos.pais }
    ];
    
    campos.forEach(campo => {
        const tr = document.createElement("tr");
        
        const tdCampo = document.createElement("td");
        const textoEtiqueta = document.createTextNode(campo.etiqueta);
        tdCampo.appendChild(textoEtiqueta);
        
        const tdValor = document.createElement("td");
        const textoValorCampo = document.createTextNode(campo.valor);
        tdValor.appendChild(textoValorCampo);
        
        tr.appendChild(tdCampo);
        tr.appendChild(tdValor);
        tbody.appendChild(tr);
    });
    
    tabla.appendChild(tbody);
    bodyModal.appendChild(tabla);
    
    modal.show();
};

const recorrerFormulario = function () {
    let totText = 0;
    let totRadio = 0;
    let totCheck = 0;
    let totDate = 0;
    let totSelect = 0;
    let totFile = 0;
    let totPass = 0;
    let totEmail = 0;

    let elementos = formulario.elements;
    let totalElementos = elementos.length;

    for (let index = 0; index < totalElementos; index++) {
        let elemento = elementos[index];
        let tipoElemento = elemento.type;
        let tipoNode = elemento.nodeName;

        if (tipoElemento == "text" && tipoNode == "INPUT") {
            console.log(elemento);
            totText++;
        } else if (tipoElemento == "password" && tipoNode == "INPUT") {
            console.log(elemento);
            totPass++;
        } else if (tipoElemento == "email" && tipoNode == "INPUT") {
            console.log(elemento);
            totEmail++;
        } else if (tipoElemento == "radio" && tipoNode == "INPUT") {
            console.log(elemento);
            totRadio++;
        } else if (tipoElemento == "checkbox" && tipoNode == "INPUT") {
            console.log(elemento);
            totCheck++;
        } else if (tipoElemento == "file" && tipoNode == "INPUT") {
            console.log(elemento);
            totFile++;
        } else if (tipoElemento == "date" && tipoNode == "INPUT") {
            console.log(elemento);
            totDate++;
        } else if (tipoNode == "SELECT"){
            console.log(elemento);
            totSelect++;
        }
    }

    let resultado = 
        `Total de input[type="text"] = ${totText}<br>
        Total de input[type="password"] = ${totPass}<br>
        Total de input[type="radio"] = ${totRadio}<br>
        Total de input[type="checkbox"] = ${totCheck}<br>
        Total de input[type="date"] = ${totDate}<br>
        Total de input[type="email"] = ${totEmail}<br>
        Total de select = ${totSelect}<br>`
    ;

    bodyModal.innerHTML = resultado;
    modal.show();
};

button.onclick = () => {
    const datosValidados = validarFormularioCompleto();
    
    if (datosValidados) {
        crearTablaConDatosFormulario(datosValidados);
    }
};