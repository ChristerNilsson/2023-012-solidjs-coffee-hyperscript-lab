# 2023-011-solidjs-coffee-hyperscript

Damen kan inte placeras var som helst.  
T ex inte på a4, då kan springaren inte nå a1.  
Detta pga att springare och dam ej får ta varandra.  

# SolidJS

Jag använder detta ramverk utan build.  
Detta genom att utnyttja 
* [SolidJS](https://www.solidjs.com) 
* [SolidJs-Hyperscript](https://www.solidjs.com/examples/simpletodoshyperscript)
* [Hyperscript](https://github.com/hyperhype/hyperscript)
* [Coffeescript](https://coffeescript.org)

Exempel:
```js
div {}, "Hello World"
```

Detta innebär att man kan deploya överallt
* Google Cloud Storage
* Github Pages
* Lokalt kan man använda:
	* python -m http.server

# Frågor
* Varför behövs två loopar i r4r?
* Varför får jag inte igång reaktiviteten?
	* T ex måste jag lägga sättningarna i click-händelsen annars utförs de ej.

# Förvärvad kunskap
En signal innehåller oftast enstaka värden, t ex heltal eller strängar.
Men, en signal kan även innehålla godtyckliga JSON-strukturer.
Då man modifierar ett sådant träd måste man först klona originalet och sedan modiera en eller flera celler. Detta kan ske mha bl a _.set, föreslagit av CoPilot. _.set ingår i Lodash.
I [_.set](https://lodash.com/docs/4.17.15#set) anger man en path, t ex "a[2].b"


