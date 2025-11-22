const newForm = document.getElementById("idNewForm");

const buttonCrear = document.getElementById("idBtnCrear");
const buttonAddElemento = document.getElementById("idBtnAddElement");

const cmbElemento = document.getElementById("idCmbElemento");

const tituloElemento = document.getElementById("idTituloElemento");
const nombreElemento = document.getElementById("idNombreElemento");

const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

const controlIdExistentes = [];

const vericarTipoElemento = function () {
    let elemento = cmbElemento.value;

    if (elemento != "") {
        modal.show();
    } else {
        alert("Debe seleccionar el elemento que se creará");
    }
};

const validarIdUnicoElementos = function (id) {
    if (controlIdExistentes.includes(id)) {
        alert(`Error: El ID "${id}" ya existe. No se permiten controles con el mismo ID.`);
        return false;
    }
    controlIdExistentes.push(id);
    return true;
};

const newSelect = function () {
    const idControl = `id${nombreElemento.value}`;
    if (!validarIdUnicoElementos(idControl)) {
        return;
    }

    let addElemento = document.createElement("select");
    addElemento.setAttribute("id", idControl);
    addElemento.setAttribute("class", "form-select");

    for (let i = 1; i <= 10; i++) {
        let addOption = document.createElement("option");
        addOption.value = i;
        addOption.innerHTML = `Opcion ${i}`;
        addElemento.appendChild(addOption);
    }

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", idControl);
    labelElemento.textContent = tituloElemento.value;

    let labelId = document.createElement("span");
    labelId.textContent = `ID de control : ${nombreElemento.value}`;

    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-floating");
    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);

    newForm.appendChild(labelId);
    newForm.appendChild(divElemento);
}

const newRadioCheckbox = function (newElemento) {
    const idControl = `id${nombreElemento.value}`;
    if (!validarIdUnicoElementos(idControl)) {
        return;
    }

    let addElemento = document.createElement("input");
    addElemento.setAttribute("id", idControl);
    addElemento.setAttribute("type", newElemento);
    addElemento.setAttribute("class", "form-check-input");

    if (newElemento === "radio") {
        addElemento.setAttribute("name", nombreElemento.value); 
        addElemento.setAttribute("value", nombreElemento.value + "-valor"); 
    }

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("class", "form-check-label");
    labelElemento.setAttribute("for", idControl);
    labelElemento.textContent = tituloElemento.value;

    let labelId = document.createElement("span");
    labelId.textContent = `ID de control : ${nombreElemento.value}`;

    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-check");
    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);

    newForm.appendChild(labelId);
    newForm.appendChild(divElemento);
}

const newInput = function (newElemento) {
    const idControl = `id${nombreElemento.value}`;
    if (!validarIdUnicoElementos(idControl)) {
        return;
    }

    let addElemento =
        newElemento == "textarea"
        ? document.createElement("textarea")
        : document.createElement("input");

    addElemento.setAttribute("id", idControl);
    addElemento.setAttribute("type", newElemento);
    addElemento.setAttribute("class", "form-check");
    addElemento.setAttribute("placeholder", tituloElemento.value);

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", idControl);
    
    let iconLabel = document.createElement("i");
    iconLabel.setAttribute("class", "bi bi-tag");

    labelElemento.textContent = tituloElemento.value;
    labelElemento.insertAdjacentElement("afterbegin", iconLabel);

    let labelId = document.createElement("span");
    labelId.textContent = `ID de control : ${nombreElemento.value}`;

    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-floating mb-3");
    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);

    newForm.appendChild(labelId);
    newForm.appendChild(divElemento);
};

const nuevasOpcionesDeInput = function() {
    const opcionesExtra = [
        { value: "color", text: "seleccionar color" },
        { value: "email", text: "Email" }
    ];
    
    opcionesExtra.forEach(opcion => {
        const option = document.createElement("option");
        option.value = opcion.value;
        option.textContent = opcion.text;
        cmbElemento.appendChild(option);
    });
};

const validarFormulario = function () {
    const controles = newForm.querySelectorAll('input, select, textarea');
    let errores = [];
    const gruposRadioValidados = []; 

    controles.forEach(control => {
        const tipo = control.type;
        const tagName = control.tagName.toLowerCase();
        
        if ((tipo == "text" || tipo == "email" || tipo == "number" || tipo == "color" || tagName == "textarea") && control.value.trim() == "") {
            errores.push(`El campo del elemento "${control.placeholder || control.name || 'sin nombre'}" está vacío`);
        }
        
        if (tagName == "select" && control.value == "") {
            errores.push(`El elemento select "${control.name || 'sin nombre'}" aún no tiene opción seleccionada`);
        }
        
        if (tipo == "radio") {
            const nombreRadio = control.name;
            if (nombreRadio && !gruposRadioValidados.includes(nombreRadio)) { 
                const radiosGrupo = newForm.querySelectorAll(`input[name="${nombreRadio}"]`);
                const algunSeleccionado = Array.from(radiosGrupo).some(radio => radio.checked);
                
                if (!algunSeleccionado) {
                    errores.push(`El elemento "${nombreRadio}" aún no tiene opción seleccionada`);
                }
                gruposRadioValidados.push(nombreRadio); 
            }
        }
        
        if (tipo == "checkbox" && !control.checked) {
            const label = newForm.querySelector(`label[for="${control.id}"]`);
            const nombreCheckbox = label 
            ? label.textContent 
            : "checkbox sin nombre";
            errores.push(`El elemento "${nombreCheckbox}" aún no tiene opción seleccionada`);
        }
    });

    if (errores.length > 0) {
        alert("Errores de validación:\n\n" + errores.join('\n'));
        return false;
    } else {
        alert("¡Formulario válido! Todos los campos están correctos.");
        return true;
    }
};

const crearBotonValidar = function() {
    const botonValidar = document.createElement("button");
    botonValidar.setAttribute("type", "button");
    botonValidar.setAttribute("id", "idBtnValidar");
    botonValidar.setAttribute("class", "btn btn-success mt-3");
    botonValidar.textContent = "Validar Formulario";
    
    botonValidar.onclick = validarFormulario;
    
    const contenedorFormulario = document.getElementById("idContenedorFormulario");
    if (contenedorFormulario) {
        contenedorFormulario.appendChild(botonValidar);
    } else {
        newForm.parentNode.appendChild(botonValidar);
    }
};

nuevasOpcionesDeInput();

crearBotonValidar(); 

buttonCrear.onclick = () => {
    vericarTipoElemento();
};

buttonAddElemento.onclick = () => {
    if (nombreElemento.value != "" && tituloElemento.value != "") {
        let elemento = cmbElemento.value;

        if (elemento == "select") {
            newSelect();
        } else if (elemento == "radio" || elemento == "checkbox") {
            newRadioCheckbox(elemento);
        } else {
            newInput(elemento);
        }
        
        modal.hide(); 
    } else {
        alert("Faltan campos por completar");
    }
};

document.getElementById("idModal").addEventListener("shown.bs.modal", () => {
    tituloElemento.value = "";
    nombreElemento.value = "";
    tituloElemento.focus();
});