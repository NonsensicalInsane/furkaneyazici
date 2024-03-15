const patreon = new Proxy({"src":"/_astro/patreon.Dmhom81c.svg","width":1024,"height":1024,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/assets/images/icons/patreon.svg";
							}
							
							return target[name];
						}
					});

export { patreon as default };
