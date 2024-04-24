const me = new Proxy({"src":"/_astro/me.B2ic110j.png","width":800,"height":800,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/assets/images/me.png";
							}
							
							return target[name];
						}
					});

export { me as default };
