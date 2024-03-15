const patreon = new Proxy({"src":"/_astro/patreon.BZLyOYfZ.png","width":512,"height":512,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/assets/images/icons/patreon.png";
							}
							
							return target[name];
						}
					});

export { patreon as default };
