const logo = new Proxy({"src":"/_astro/logo.BK6U1qto.png","width":750,"height":750,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici/src/assets/images/icons/logo.png";
							}
							
							return target[name];
						}
					});

export { logo as default };
