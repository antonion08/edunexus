import { CreateMLCEngine } from "https://esm.run/@mlc-ai/web-llm";
const Select_model = "Llama-3.1-8B-Instruct-q4f32_1-MLC"; 
const $ = el => document.querySelector(el);
const $form = $('form');
const $input = $('input');
const $template = $('#mensaje-template');
const $mensaje = $('main ul.mensajes');
const $container = $('main');
const $button = $('button');
const $small = $('small')
let messages = [];
const engine = await CreateMLCEngine(
    Select_model,
    {
        initProgressCallback: (info) =>{
            console.log('initProgressCallback',info)
            $small.textContent = info.text

            if(info.progress == 1){
                $button.removeAttribute("disabled")
            }           
        }
    }
);


$form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const messagetext = $input.value.trim();

    if (messagetext !== '') {
        $input.value = '';
    }
    addmensage(messagetext, 'user');
    $button.setAttribute('disabled'," ")

    const userMessage = {
        role: "user",
        content: messagetext
    }
    
    messages.push(userMessage);

    const chunks = await engine.chat.completions.create({
        messages,
        stream : true
    })

    let reply = ""
     
    const botText = addmensage ("",'bot')

    for await (const chunk of chunks ){
        const [choices] = chunk.choices
        const content = choices?.delta?.content ?? ""
        reply += content
        botText.textContent = reply
    }

    $button.removeAttribute("disabled")
    messages.push({
        role:'assistant',
        content : reply
    })
    $container.scrollTop =$container.scrollHeight 
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
    $container.scrollTop = $container.scrollHeight
    
    return $text
    
}