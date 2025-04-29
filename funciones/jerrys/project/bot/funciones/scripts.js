const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
const sendButton = document.querySelector('button'); // Seleccionamos el botón

async function enviarMensaje() {
    const mensajeUsuario = userInput.value.trim();
    if (mensajeUsuario !== "") {
        mostrarMensajeUsuario(mensajeUsuario);
        userInput.value = ""; // Limpiar el input después de enviar

        // Enviar el mensaje a la API de Ollama
        try {
            const respuestaOllama = await enviarAOllama(mensajeUsuario);
            mostrarMensajeChatbot(respuestaOllama);
        } catch (error) {
            console.error("Error al comunicarse con Ollama:", error);
            mostrarMensajeChatbot("Lo siento, hubo un error al obtener la respuesta.");
        }
    }
}

async function enviarAOllama(mensaje) {
    const ollamaApiUrl = 'http://localhost:11434/api/chat';
    const modelo = 'llama2'; // Puedes cambiarlo al modelo que estés usando

    const response = await fetch(ollamaApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: modelo,
            messages: [{ role: 'user', content: mensaje }]
        })
    });

    if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Error en la petición a Ollama: ${response.status} - ${JSON.stringify(errorDetails)}`);
    }

    const data = await response.json();
    // La respuesta de Ollama puede tener varios mensajes, usualmente el último es la respuesta final
    return data.choices[0].message.content;
}

function mostrarMensajeUsuario(mensaje) {
    const mensajeDiv = document.createElement('div');
    mensajeDiv.classList.add('user-message');
    mensajeDiv.textContent = mensaje;
    chatContainer.appendChild(mensajeDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function mostrarMensajeChatbot(mensaje) {
    const mensajeDiv = document.createElement('div');
    mensajeDiv.classList.add('chatbot-message'); // Añadimos una clase para estilos
    mensajeDiv.textContent = mensaje;
    chatContainer.appendChild(mensajeDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Modificamos el evento del botón para usar la función asíncrona
sendButton.addEventListener('click', enviarMensaje);

// Opcional: permitir enviar el mensaje al presionar Enter en el input
userInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        enviarMensaje();
    }
});