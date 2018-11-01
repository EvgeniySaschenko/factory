import division from './division';
import docAutomatMap from './doc-automat-map';
import docRoutMap from './doc-rout-map';
import material from './material';
import nav from './nav';
import operation from './operation';
import tool from './tool';
import user from './user';

window.baseUrl= 'http://localhost:3000';

const API= {
	division,
	docAutomatMap,
	docRoutMap,
	material,
	nav,
	operation,
	tool,
	user,
}

export default API;