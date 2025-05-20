const $ = el => document.querySelector(el);
const $form = $('form');
const $input = $('input');
const $template = $('#mensaje-template');
const $mensaje = $('main ul.mensajes');
const $container = $('main');
const $button = $('button');
const $small = $('small');
let messages = [];
//var reply = [];

const OLLAMA_API_URL = 'http://localhost:11434/api/generate'; // URL de la API de Ollama
const OLLAMA_MODEL = 'llama3.2'; // Reemplaza con el modelo que estés usando en Ollama

$form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const messagetext = $input.value.trim();

    if (messagetext !== '') {
        $input.value = '';
    }
    addmensage(messagetext, 'user');
    $button.setAttribute('disabled', '');
    $small.textContent = 'Ollama está respondiendo...';

    const userMessage = {
        role: 'user',
        content: messagetext
    };

    messages.push(userMessage);

    try {
        const response = await fetch(OLLAMA_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: messagetext, // Usamos el último mensaje del usuario como prompt
                model: OLLAMA_MODEL,
                stream: true // Habilitamos el streaming para recibir la respuesta en partes
            })
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Error al comunicarse con Ollama:', error);
            addmensage(`Error de Ollama: ${error?.error || response.statusText}`, 'error');
            $button.removeAttribute('disabled');
            $small.textContent = '';
            return;
        }

        //let reply = "";
        const botTextElement = addmensage('', 'ollama');

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let partialResponse = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                break;
            }
            partialResponse += decoder.decode(value);
            // Procesar las líneas JSON del stream de Ollama
            const lines = partialResponse.split('\n').filter(line => line.trim() !== '');

var reply = ""; // Inicializa la variable para la respuesta completa fuera del bucle

for (const line of lines) {
    if (typeof line !== 'string' || !line.startsWith('{')) {
        console.warn('Línea inválida, omitiendo:', line);
        continue;
    }

    try {
        const data = JSON.parse(line);
        if (data.response) {
            reply += ""+ data.response; // Acumula el nuevo fragmento a la respuesta
            botTextElement.textContent = reply; // Muestra la respuesta acumulada
        }
        if (data.done) {
            console.log("Respuesta completa:", reply);
            // Aquí podrías realizar acciones al finalizar
        }
        console.log("Fragmento recibido:"); // Para depuración
    } catch (error) {
        console.warn('Error al parsear JSON:', line, error);
    }
}
            $container.scrollTop = $container.scrollHeight;
        }
        $button.removeAttribute('disabled');
        $small.textContent = '';
        messages.push({
            role: 'assistant',
            content: reply
        });
        $container.scrollTop = $container.scrollHeight;

    } catch (error) {
        console.error('Error en la comunicación:', error);
        addmensage('Error al obtener la respuesta de Ollama.', 'error');
        $button.removeAttribute('disabled');
        $small.textContent = '';
    }
});

function addmensage(text, sender) {
    // Clonar el template
    const clonar_template = $template.content.cloneNode(true);
    const $newMessage = clonar_template.querySelector('li'); // Selecciona el li directamente
    const $who = $newMessage.querySelector('span');
    const $text = $newMessage.querySelector('p');

    $text.textContent = text;
    $who.textContent = sender === 'user' ? 'tu' : 'ollama'; // Actualiza el 'quién' basado en el sender

    // Añade las clases necesarias
    $newMessage.classList.add('mensaje'); // Añade la clase base 'mensaje'
    $newMessage.classList.add(`mensaje-${sender}`); // Añade la clase específica 'mensaje-user' o 'mensaje-bot'

    // Actualizar el scroll
    $mensaje.appendChild($newMessage);
    $container.scrollTop = $container.scrollHeight;

    return $text;
}