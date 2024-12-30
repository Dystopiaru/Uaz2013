const main = class {
	//инициализация приложения 
	constructor() {
		fetch('../data/scheme.svg').then(response => response.text()).then(svg => {
			document.getElementById('scheme').innerHTML = svg;
			const regex = /^([А-Я][а-я]?)([А-Я][а-я]?)?([0-9]{0,4})([а-я]?)$/;
			const regex2 = /^\.(.+)$/;
			const elModules = document.querySelector('[data-type="modules"]');
			const arrLinks=[];
			document.querySelectorAll('g text').forEach((elMarker,elIndex)=>{
				let match = regex.exec(elMarker.innerHTML);
				const markerId ='marker'+elIndex;
				elMarker.id = markerId;
				if(match){
					const color1=match[1];
					const color2=match[2];
					const number=match[3];
					const index=match[4];
					elMarker.classList.add('c1-'+this.colorClass(color1));
					if(color2){
						elMarker.classList.add('c2-'+this.colorClass(color2));
					} else {
						elMarker.classList.add('c2-'+this.colorClass(color1));
					}
					elMarker.dataset.group = this.colorClass(color1) + (color2 ? '-'+this.colorClass(color2) : '')+(number ? '-'+number : '');
					elMarker.dataset.action = 'wiring';
					return true;
				} 
				
				match = regex2.exec(elMarker.innerHTML);
				if(match) {
					elMarker.classList.add('hide');
					const elLink = document.createElement('div');
					elLink.classList.add('scroll-btn');
					elLink.dataset.marker=markerId;
					elLink.dataset.action='scrollto';
					elLink.innerText=match[1];
					arrLinks.push(elLink);
					return true;
				}
			});
			arrLinks.sort(function compare(a, b) {
				if (a.innerText < b.innerText) return -1;
				if (a.innerText > b.innerText) return 1;
				return 0;
			});
			arrLinks.forEach((elLink)=>{ elModules.append(elLink); });
		});
		
		document.addEventListener('click', function (event) {
			const elClick = event.target;
			const elWires= document.querySelector('[data-type="wires"]');
			if (elClick.dataset.action=='scrollto') {
				const elMarker = document.querySelector('#'+elClick.dataset.marker);
				if(elMarker) elMarker.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'});
			}
			
			if (elClick.dataset.action=='wiring') {
				document.querySelectorAll('.active').forEach((elActive)=>{ elActive.classList.remove('active'); });
				elWires.innerHTML = '';
				const arrLinks=[];
				document.querySelectorAll('[data-group="'+ elClick.dataset.group +'"]').forEach((elMarker)=>{
					elMarker.classList.add('active');
					const elLink = document.createElement('div');
					elLink.classList.add('scroll-btn');
					elLink.dataset.marker=elMarker.id;
					elLink.dataset.action='scrollto';
					elLink.innerText=elMarker.innerHTML;
					arrLinks.push(elLink);
				});
				arrLinks.sort(function compare(a, b) {
					if (a.innerText < b.innerText) return -1;
					if (a.innerText > b.innerText) return 1;
					return 0;
				});
				arrLinks.forEach((elLink)=>{ elWires.append(elLink); });
			}
		});
		const objPanzoom  = new dystopiaru.panzoom(document.getElementById('scheme'));
	};
	
	//преобразование цветов в классы
	colorClass(title){
		switch(title){
			case 'Ч':
				return 'black';			
			case 'Г':
				return 'blue';		
			case 'Кч':
				return 'brown';					
			case 'З':
				return 'green';			
			case 'С':
				return 'grey';			
			case 'О':
				return 'orange';
			case 'Р':
				return 'pink';					
			case 'К':
				return 'red';
			case 'Ф':
				return 'violet';
			case 'Б':
				return 'white';	
			case 'Ж':
				return 'yellow';					
			default:
				return '';
		}
	}
}

objMain = new main();