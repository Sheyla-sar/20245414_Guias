document.addEventListener("DOMContentLoaded", function() {
    
    const formulario = document.getElementById('formulario');
    const carnetInput = document.getElementById('Carnet');
    const nombreInput = document.getElementById('Nombre');
    const duiInput = document.getElementById('Dui');
    const nitInput = document.getElementById('Nit');
    const fechaInput = document.getElementById('Fecha');
    const correoInput = document.getElementById('Correo');
    const edadInput = document.getElementById('Edad');

    const carnetRegex = /^[A-Za-z]{2}\d{3}$/;
    const nombreRegex = /^[A-Za-z\s]+$/;
    const duiRegex = /^\d{8}-\d{1}$/;
    const nitRegex = /^\d{4}-\d{6}-\d{3}-\d{1}$/;
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    const edadRegex = /^\d+$/

    function mostrarError(input, mensajeError) {
        input.classList.remove('valido');
        input.classList.add('invalido');

        let elementoError = input.nextElementSibling;
        if (!elementoError || !elementoError.classList.contains('mensaje-error')) {
            elementoError = document.createElement('span');
            elementoError.className = 'mensaje-error';
            input.parentNode.appendChild(elementoError);         
        }
        elementoError.textContent = mensajeError;
    }

    function ocultarError(input) {
        input.classList.remove('invalido');
        input.classList.add('valido');
        
        let elementoError = input.nextElementSibling;
        if (elementoError && elementoError.classList.contains('mensaje-error')) {
            elementoError.remove();
        }
    }

    function validarCampo(input, reglaRegex, mensajeError) {
        const valor = input.value.trim();

        if (reglaRegex.test(valor)) {
            ocultarError(input);
            return true;
        } else {
            mostrarError(input, mensajeError);
            return false;
        }
    }
    
    function validarFecha(input) {
        const valor = input.value;

        if (!valor) {
            mostrarError(input, "Por favor, selecciona una fecha.");
            return false;
        }

        const selectedDate = new Date(valor);
        const currentDate = new Date();
        
        currentDate.setHours(0, 0, 0, 0); 
        
        if (selectedDate > currentDate) {
            mostrarError(input, "La fecha de nacimiento no puede ser posterior a la fecha actual.");
            return false;
        } else {
            ocultarError(input);
            return true;
        }
    }

    carnetInput.addEventListener('input', function () {
        this.value = this.value.toUpperCase();
        validarCampo(this, carnetRegex, "Formato: dos letras y tres números (ej: AB001)");
    });

    nombreInput.addEventListener('input', function () {
        validarCampo(this, nombreRegex, "Solo se permiten letras y espacios, sin caracteres especiales");
    });

    duiInput.addEventListener('input', function () {
        validarCampo(this, duiRegex, "Formato: XXXXXXXX-X");
    });

    nitInput.addEventListener('input', function () {
        validarCampo(this, nitRegex, "Formato: XXXX-XXXXXX-###-#");
    });

    correoInput.addEventListener('input', function() {
        validarCampo(this, correoRegex, "Formato de correo inválido");
    });

    fechaInput.addEventListener('change', function () {
        validarFecha(this);
    });

    edadInput.addEventListener('input', function () {
        const esValida = validarCampo(this, edadRegex, "Solo se permiten números");
        if (esValida) {
             const edad = parseInt(this.value);
             if (edad < 0 || edad > 100) {
                 mostrarError(this, "La edad debe estar entre 0 y 100.");
                 return false;
             } else {
                 ocultarError(this);
                 return true;
             }
        }
        return esValida;
    });

    carnetInput.placeholder = 'AB001';
    duiInput.placeholder = '00000000-0';
    nitInput.placeholder = '0000-000000-000-0';
    correoInput.placeholder = 'estudiante@ejemplo.com';
    nombreInput.placeholder = 'Juan Pérez'; 
    edadInput.placeholder = '20'; 

    formulario.addEventListener('submit', function (event) {
        
        const esCarnetValido = validarCampo(carnetInput, carnetRegex, "Formato: dos letras y tres números (ej: AB001)");
        const esNombreValido = validarCampo(nombreInput, nombreRegex, "Solo se permiten letras y espacios, sin caracteres especiales");
        const esDuiValido = validarCampo(duiInput, duiRegex, "Formato: XXXXXXXX-X");
        const esNitValido = validarCampo(nitInput, nitRegex, "Formato: XXXX-XXXXXX-###-#");
        const esCorreoValido = validarCampo(correoInput, correoRegex, "Formato de correo inválido");
        const esEdadValida = validarCampo(edadInput, edadRegex, "Solo se permiten números");
        const esFechaValida = validarFecha(fechaInput); 

        if (!esCarnetValido || !esNombreValido || !esDuiValido || !esNitValido || !esCorreoValido || !esEdadValida || !esFechaValida) {
            event.preventDefault(); 
            alert('Por favor, corrige los campos marcados antes de enviar.');
        } else {
            alert('Su ficha ha sido completada y enviada con exito');
        }
    });
});