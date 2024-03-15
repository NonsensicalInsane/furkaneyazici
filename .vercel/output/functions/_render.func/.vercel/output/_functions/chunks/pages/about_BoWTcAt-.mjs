import { d as createAstro, e as createComponent, r as renderTemplate, i as renderComponent, m as maybeRenderHead, g as addAttribute, s as spreadAttributes, j as Fragment, u as unescapeHTML, l as renderSlot } from '../astro_Cn1-UY-y.mjs';
import 'kleur/colors';
import { g as getImage, f as findImage, a as getPagePermalink, $ as $$Image$1, U as UI, t as trimSlash, b as getHomePermalink, c as getAsset, S as SITE, d as $$Layout } from './404_BVup45wh.mjs';
import { parseUrl, transformUrl } from 'unpic';
import { getIconData, iconToSVG } from '@iconify/utils';
import { twMerge } from 'tailwind-merge';
import 'clsx';

const config = {
  // FIXME: Use this when image.width is minor than deviceSizes
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  deviceSizes: [
    640,
    // older and lower-end phones
    750,
    // iPhone 6-8
    828,
    // iPhone XR/11
    960,
    // older horizontal phones
    1080,
    // iPhone 6-8 Plus
    1280,
    // 720p
    1668,
    // Various iPads
    1920,
    // 1080p
    2048,
    // QXGA
    2560,
    // WQXGA
    3200,
    // QHD+
    3840,
    // 4K
    4480,
    // 4.5K
    5120,
    // 5K
    6016
    // 6K
  ],
  formats: ["image/webp"]
};
const computeHeight = (width, aspectRatio) => {
  return Math.floor(width / aspectRatio);
};
const parseAspectRatio = (aspectRatio) => {
  if (typeof aspectRatio === "number")
    return aspectRatio;
  if (typeof aspectRatio === "string") {
    const match = aspectRatio.match(/(\d+)\s*[/:]\s*(\d+)/);
    if (match) {
      const [, num, den] = match.map(Number);
      if (den && !isNaN(num))
        return num / den;
    } else {
      const numericValue = parseFloat(aspectRatio);
      if (!isNaN(numericValue))
        return numericValue;
    }
  }
  return void 0;
};
const getSizes = (width, layout) => {
  if (!width || !layout) {
    return void 0;
  }
  switch (layout) {
    case `constrained`:
      return `(min-width: ${width}px) ${width}px, 100vw`;
    case `fixed`:
      return `${width}px`;
    case `fullWidth`:
      return `100vw`;
    default:
      return void 0;
  }
};
const pixelate = (value) => value || value === 0 ? `${value}px` : void 0;
const getStyle = ({
  width,
  height,
  aspectRatio,
  layout,
  objectFit = "cover",
  objectPosition = "center",
  background
}) => {
  const styleEntries = [["object-fit", objectFit], ["object-position", objectPosition]];
  if (background?.startsWith("https:") || background?.startsWith("http:") || background?.startsWith("data:")) {
    styleEntries.push(["background-image", `url(${background})`]);
    styleEntries.push(["background-size", "cover"]);
    styleEntries.push(["background-repeat", "no-repeat"]);
  } else {
    styleEntries.push(["background", background]);
  }
  if (layout === "fixed") {
    styleEntries.push(["width", pixelate(width)]);
    styleEntries.push(["height", pixelate(height)]);
    styleEntries.push(["object-position", "top left"]);
  }
  if (layout === "constrained") {
    styleEntries.push(["max-width", pixelate(width)]);
    styleEntries.push(["max-height", pixelate(height)]);
    styleEntries.push(["aspect-ratio", aspectRatio ? `${aspectRatio}` : void 0]);
    styleEntries.push(["width", "100%"]);
  }
  if (layout === "fullWidth") {
    styleEntries.push(["width", "100%"]);
    styleEntries.push(["aspect-ratio", aspectRatio ? `${aspectRatio}` : void 0]);
    styleEntries.push(["height", pixelate(height)]);
  }
  if (layout === "responsive") {
    styleEntries.push(["width", "100%"]);
    styleEntries.push(["height", "auto"]);
    styleEntries.push(["aspect-ratio", aspectRatio ? `${aspectRatio}` : void 0]);
  }
  if (layout === "contained") {
    styleEntries.push(["max-width", "100%"]);
    styleEntries.push(["max-height", "100%"]);
    styleEntries.push(["object-fit", "contain"]);
    styleEntries.push(["aspect-ratio", aspectRatio ? `${aspectRatio}` : void 0]);
  }
  if (layout === "cover") {
    styleEntries.push(["max-width", "100%"]);
    styleEntries.push(["max-height", "100%"]);
  }
  const styles = Object.fromEntries(styleEntries.filter(([, value]) => value));
  return Object.entries(styles).map(([key, value]) => `${key}: ${value};`).join(" ");
};
const getBreakpoints = ({
  width,
  breakpoints,
  layout
}) => {
  if (layout === "fullWidth" || layout === "cover" || layout === "responsive" || layout === "contained") {
    return breakpoints || config.deviceSizes;
  }
  if (!width) {
    return [];
  }
  const doubleWidth = width * 2;
  if (layout === "fixed") {
    return [width, doubleWidth];
  }
  if (layout === "constrained") {
    return [
      // Always include the image at 1x and 2x the specified width
      width,
      doubleWidth,
      // Filter out any resolutions that are larger than the double-res image
      ...(breakpoints || config.deviceSizes).filter((w) => w < doubleWidth)
    ];
  }
  return [];
};
const astroAsseetsOptimizer = async (image, breakpoints) => {
  if (!image || typeof image === "string") {
    return [];
  }
  return Promise.all(breakpoints.map(async (w) => {
    const url = (await getImage({
      src: image,
      width: w
    })).src;
    return {
      src: url,
      width: w
    };
  }));
};
const unpicOptimizer = async (image, breakpoints, width, height) => {
  if (!image || typeof image !== "string") {
    return [];
  }
  const urlParsed = parseUrl(image);
  if (!urlParsed) {
    return [];
  }
  return Promise.all(breakpoints.map(async (w) => {
    const url = transformUrl({
      url: image,
      width: w,
      height: width && height ? computeHeight(w, width / height) : height,
      cdn: urlParsed.cdn
    }) || image;
    return {
      src: String(url),
      width: w
    };
  }));
};
async function getImagesOptimized(image, {
  src: _,
  width,
  height,
  sizes,
  aspectRatio,
  widths,
  layout = "constrained",
  style = "",
  ...rest
}, transform = () => Promise.resolve([])) {
  if (typeof image !== "string") {
    width ||= Number(image.width) || void 0;
    height ||= typeof width === "number" ? computeHeight(width, image.width / image.height) : void 0;
  }
  width = width && Number(width) || void 0;
  height = height && Number(height) || void 0;
  widths ||= config.deviceSizes;
  sizes ||= getSizes(Number(width) || void 0, layout);
  aspectRatio = parseAspectRatio(aspectRatio);
  if (aspectRatio) {
    if (width) {
      if (height) ; else {
        height = width / aspectRatio;
      }
    } else if (height) {
      width = Number(height * aspectRatio);
    } else if (layout !== "fullWidth") {
      console.error("When aspectRatio is set, either width or height must also be set");
      console.error("Image", image);
    }
  } else if (width && height) {
    aspectRatio = width / height;
  } else if (layout !== "fullWidth") {
    console.error("Either aspectRatio or both width and height must be set");
    console.error("Image", image);
  }
  let breakpoints = getBreakpoints({
    width,
    breakpoints: widths,
    layout
  });
  breakpoints = [...new Set(breakpoints)].sort((a, b) => a - b);
  const srcset = (await transform(image, breakpoints, Number(width) || void 0, Number(height) || void 0)).map(({
    src,
    width: width2
  }) => `${src} ${width2}w`).join(", ");
  return {
    src: typeof image === "string" ? image : image.src,
    attributes: {
      width,
      height,
      srcset: srcset || void 0,
      sizes,
      style: `${getStyle({
        width,
        height,
        aspectRatio,
        layout
      })}${style ?? ""}`,
      ...rest
    }
  };
}

const $$Astro$h = createAstro("https://furkaneyazici.netlify.app");
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$h, $$props, $$slots);
  Astro2.self = $$Image;
  const props = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new Error();
  }
  if (typeof props.width === "string") {
    props.width = parseInt(props.width);
  }
  if (typeof props.height === "string") {
    props.height = parseInt(props.height);
  }
  if (!props.loading) {
    props.loading = "lazy";
  }
  if (!props.decoding) {
    props.decoding = "async";
  }
  const _image = await findImage(props.src);
  let image = void 0;
  if (_image !== null && typeof _image === "object") {
    image = await getImagesOptimized(_image, props, astroAsseetsOptimizer);
  } else if (typeof _image === "string" && (_image.startsWith("http://") || _image.startsWith("https://"))) {
    image = await getImagesOptimized(_image, props, unpicOptimizer);
  } else if (_image) {
    image = await getImagesOptimized(_image, props);
  }
  return renderTemplate`${!image ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {})}` : renderTemplate`${maybeRenderHead()}<img${addAttribute(image.src, "src")}${spreadAttributes(image.attributes)}>`}`;
}, "/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/components/common/Image.astro", void 0);


const cache = /* @__PURE__ */ new WeakMap();

const $$Astro$g = createAstro("https://furkaneyazici.netlify.app");
const $$Icon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$g, $$props, $$slots);
  Astro2.self = $$Icon;
  class AstroIconError extends Error {
    constructor(message) {
      super(message);
    }
  }
  const req = Astro2.request;
  const { name = "", title, "is:inline": inline = false, ...props } = Astro2.props;
  const map = cache.get(req) ?? /* @__PURE__ */ new Map();
  const i = map.get(name) ?? 0;
  map.set(name, i + 1);
  cache.set(req, map);
  const includeSymbol = !inline && i === 0;
  let [setName, iconName] = name.split(":");
  if (!setName && iconName) {
    const err = new AstroIconError(`Invalid "name" provided!`);
    throw err;
  }
  if (!iconName) {
    iconName = setName;
    setName = "local";
    if (!icons[setName]) {
      const err = new AstroIconError('Unable to load the "local" icon set!');
      throw err;
    }
    if (!(iconName in icons[setName].icons)) {
      const err = new AstroIconError(`Unable to locate "${name}" icon!`);
      throw err;
    }
  }
  const collection = icons[setName];
  if (!collection) {
    const err = new AstroIconError(`Unable to locate the "${setName}" icon set!`);
    throw err;
  }
  const iconData = getIconData(collection, iconName ?? setName);
  if (!iconData) {
    const err = new AstroIconError(`Unable to locate "${name}" icon!`);
    throw err;
  }
  const id = `ai:${collection.prefix}:${iconName ?? setName}`;
  if (props.size) {
    props.width = props.size;
    props.height = props.size;
    delete props.size;
  }
  const renderData = iconToSVG(iconData);
  const normalizedProps = { ...renderData.attributes, ...props };
  const normalizedBody = renderData.body;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(normalizedProps)}${addAttribute(name, "data-icon")}> ${title && renderTemplate`<title>${title}</title>`} ${inline ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "id": id }, { "default": ($$result2) => renderTemplate`${unescapeHTML(normalizedBody)}` })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${includeSymbol && renderTemplate`<symbol${addAttribute(id, "id")}>${unescapeHTML(normalizedBody)}</symbol>`}<use${addAttribute(`#${id}`, "xlink:href")}></use> ` })}`} </svg>`;
}, "/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/node_modules/astro-icon/components/Icon.astro", void 0);

const $$Astro$f = createAstro("https://furkaneyazici.netlify.app");
const $$Button = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$Button;
  const {
    variant = "secondary",
    target,
    text = Astro2.slots.render("default"),
    icon = "",
    class: className = "",
    type,
    ...rest
  } = Astro2.props;
  const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    tertiary: "btn btn-tertiary",
    link: "cursor-pointer hover:text-primary"
  };
  return renderTemplate`${type === "button" || type === "submit" || type === "reset" ? renderTemplate`${maybeRenderHead()}<button${addAttribute(type, "type")}${addAttribute(twMerge(variants[variant] || "", className), "class")}${spreadAttributes(rest)}>${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(text)}` })}${icon && renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": icon, "class": "w-5 h-5 ml-1 -mr-1.5 rtl:mr-1 rtl:-ml-1.5 inline-block" })}`}</button>` : renderTemplate`<a${addAttribute(twMerge(variants[variant] || "", className), "class")}${spreadAttributes(target ? { target, rel: "noopener noreferrer" } : {})}${spreadAttributes(rest)}>${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(text)}` })}${icon && renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": icon, "class": "w-5 h-5 ml-1 -mr-1.5 rtl:mr-1 rtl:-ml-1.5 inline-block" })}`}</a>`}`;
}, "/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/components/ui/Button.astro", void 0);

const $$Astro$e = createAstro("https://furkaneyazici.netlify.app");
const $$Hero = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$Hero;
  const {
    id,
    title = await Astro2.slots.render("title"),
    subtitle = await Astro2.slots.render("subtitle"),
    tagline,
    content = await Astro2.slots.render("content"),
    actions = await Astro2.slots.render("actions"),
    image = await Astro2.slots.render("image"),
    callPagePath = await Astro2.slots.render("callPagePath"),
    callPageName = await Astro2.slots.render("callPageName")
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="relative md:-mt-[76px] not-prose"${spreadAttributes(id ? { id } : {})}> <div class="absolute inset-0 pointer-events-none" aria-hidden="true"></div> <div class="relative max-w-7xl mx-auto px-4 sm:px-6"> <div class="pt-0 md:pt-[76px] pointer-events-none"></div> <div class="py-12 md:py-20"> <div class="text-center pb-10 md:pb-16 max-w-5xl mx-auto"> ${tagline && renderTemplate`<p class="text-base text-secondary dark:text-blue-200 font-bold tracking-wide uppercase">${unescapeHTML(tagline)}</p>`} ${title && renderTemplate`<h1 class="text-5xl md:text-6xl font-bold leading-tighter tracking-tighter mb-4 font-heading dark:text-gray-200">${unescapeHTML(title)}</h1>`} <div class="max-w-3xl mx-auto"> ${subtitle && renderTemplate`<p class="text-xl text-muted mb-6 dark:text-slate-300">${unescapeHTML(subtitle)}</p>`} ${actions && renderTemplate`<div class="max-w-xs sm:max-w-md m-auto flex flex-nowrap flex-col sm:flex-row sm:justify-center gap-4"> ${Array.isArray(actions) ? actions.map((action) => renderTemplate`<div class="flex w-full sm:w-auto"> ${renderComponent($$result, "Button", $$Button, { ...action || {}, "class": "w-full sm:mb-0" })} </div>`) : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(actions)}` })}`} </div>`} </div> ${content && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(content)}` })}`} ${callPagePath && callPageName && renderTemplate`<div class="mt-8"> ${renderComponent($$result, "Button", $$Button, { "href": getPagePermalink(callPagePath), "class": "w-full sm:w-auto" }, { "default": ($$result2) => renderTemplate`${callPageName}` })} </div>`} </div> <div> ${image && renderTemplate`<div class="relative m-auto max-w-5xl"> ${typeof image === "string" ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(image)}` })}` : renderTemplate`${renderComponent($$result, "Image", $$Image, { "class": "mx-auto rounded-md w-full", "widths": [400, 768, 1024, 2040], "sizes": "(max-width: 767px) 400px, (max-width: 1023px) 768px, (max-width: 2039px) 1024px, 2040px", "loading": "eager", "width": 1024, "height": 576, ...image })}`} </div>`} </div> </div> </div> </section>`;
}, "/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/components/widgets/Hero.astro", void 0);

const $$Astro$d = createAstro("https://furkaneyazici.netlify.app");
const $$Background = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$Background;
  const { isDark = false } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(["absolute inset-0", { "bg-dark dark:bg-transparent": isDark }], "class:list")}> ${renderSlot($$result, $$slots["default"])} </div>`;
}, "/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/components/ui/Background.astro", void 0);

const $$Astro$c = createAstro("https://furkaneyazici.netlify.app");
const $$WidgetWrapper = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$WidgetWrapper;
  const { id, isDark = false, containerClass = "", bg, as = "section" } = Astro2.props;
  const WrapperTag = as;
  return renderTemplate`${renderComponent($$result, "WrapperTag", WrapperTag, { "class": "relative not-prose scroll-mt-[60px]", ...id ? { id } : {} }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="absolute inset-0 pointer-events-none -z-[1]" aria-hidden="true"> ${renderSlot($$result2, $$slots["bg"], renderTemplate` ${bg ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${unescapeHTML(bg)}` })}` : renderTemplate`${renderComponent($$result2, "Background", $$Background, { "isDark": isDark })}`} `)} </div> <div${addAttribute([
    twMerge("relative mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16 lg:py-20 text-default", containerClass),
    { dark: isDark }
  ], "class:list")}> ${renderSlot($$result2, $$slots["default"])} </div> ` })}`;
}, "/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/components/ui/WidgetWrapper.astro", void 0);

const $$Astro$b = createAstro("https://furkaneyazici.netlify.app");
const $$Timeline = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$Timeline;
  const { items = [], classes = {}, defaultIcon } = Astro2.props;
  const {
    container: containerClass = "",
    panel: panelClass = "",
    title: titleClass = "",
    description: descriptionClass = "",
    icon: defaultIconClass = "text-primary dark:text-slate-200 border-primary dark:border-blue-700"
  } = classes;
  return renderTemplate`${items && items.length && renderTemplate`${maybeRenderHead()}<div${addAttribute(containerClass, "class")}>${items.map(
    ({ title, description, icon, classes: itemClasses = {} }, index = 0) => renderTemplate`<div${addAttribute(twMerge("flex", panelClass, itemClasses?.panel), "class")}><div class="flex flex-col items-center mr-4 rtl:mr-0 rtl:ml-4"><div><div class="flex items-center justify-center">${(icon || defaultIcon) && renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": icon || defaultIcon, "class": twMerge(
      "w-10 h-10 p-2 rounded-full border-2",
      defaultIconClass,
      itemClasses?.icon
    ) })}`}</div></div>${index !== items.length - 1 && renderTemplate`<div class="w-px h-full bg-black/10 dark:bg-slate-400/50"></div>`}</div><div${addAttribute(`pt-1 ${index !== items.length - 1 ? "pb-8" : ""}`, "class")}>${title && renderTemplate`<p${addAttribute(twMerge(
      "text-xl font-bold",
      titleClass,
      itemClasses?.title
    ), "class")}>${unescapeHTML(title)}</p>`}${description && renderTemplate`<p${addAttribute(twMerge(
      "text-muted mt-2",
      descriptionClass,
      itemClasses?.description
    ), "class")}>${unescapeHTML(description)}</p>`}</div></div>`
  )}</div>`}`;
}, "/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/components/ui/Timeline.astro", void 0);

const $$Astro$a = createAstro("https://furkaneyazici.netlify.app");
const $$Headline = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$Headline;
  const {
    title = await Astro2.slots.render("title"),
    subtitle = await Astro2.slots.render("subtitle"),
    tagline,
    classes = {},
    callPagePath = await Astro2.slots.render("callPagePath"),
    callPageName = await Astro2.slots.render("callPageName")
  } = Astro2.props;
  const {
    container: containerClass = "max-w-3xl",
    title: titleClass = "text-3xl md:text-4xl ",
    subtitle: subtitleClass = "text-xl"
  } = classes;
  return renderTemplate`${(title || subtitle || tagline || callPageName || callPagePath) && renderTemplate`${maybeRenderHead()}<div${addAttribute(twMerge("mb-8 md:mx-auto md:mb-12 text-center", containerClass), "class")}>${tagline && renderTemplate`<p class="text-base text-secondary dark:text-blue-200 font-bold tracking-wide uppercase">${unescapeHTML(tagline)}</p>`}${title && renderTemplate`<h2${addAttribute(twMerge(
    "font-bold leading-tighter tracking-tighter font-heading text-heading text-3xl",
    titleClass
  ), "class")}>${unescapeHTML(title)}</h2>`}${subtitle && renderTemplate`<p${addAttribute(twMerge("mt-4 text-muted", subtitleClass), "class")}>${unescapeHTML(subtitle)}</p>`}<div class="mt-8">${callPageName && callPagePath && renderTemplate`${renderComponent($$result, "Button", $$Button, { "href": getPagePermalink(callPagePath) }, { "default": ($$result2) => renderTemplate`${callPageName}` })}`}</div></div>`}`;
}, "/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/components/ui/Headline.astro", void 0);

const $$Astro$9 = createAstro("https://furkaneyazici.netlify.app");
const $$Steps = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$Steps;
  const {
    title = await Astro2.slots.render("title"),
    subtitle = await Astro2.slots.render("subtitle"),
    tagline = await Astro2.slots.render("tagline"),
    items = [],
    image = await Astro2.slots.render("image"),
    isReversed = false,
    id,
    isDark = false,
    classes = {},
    bg = await Astro2.slots.render("bg")
  } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "WidgetWrapper", $$WidgetWrapper, { "id": id, "isDark": isDark, "containerClass": `max-w-5xl ${classes?.container ?? ""}`, "bg": bg }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div${addAttribute(["flex flex-col gap-8 md:gap-12", { "md:flex-row-reverse": isReversed }, { "md:flex-row": image }], "class:list")}> <div${addAttribute(["md:py-4 md:self-center", { "md:basis-1/2": image }, { "w-full": !image }], "class:list")}> ${renderComponent($$result2, "Headline", $$Headline, { "title": title, "subtitle": subtitle, "tagline": tagline, "classes": {
    container: "text-left rtl:text-right",
    title: "text-3xl lg:text-4xl",
    ...classes?.headline ?? {}
  } })} ${renderComponent($$result2, "Timeline", $$Timeline, { "items": items, "classes": classes?.items })} </div> ${image && renderTemplate`<div class="relative md:basis-1/2"> ${typeof image === "string" ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${unescapeHTML(image)}` })}` : renderTemplate`${renderComponent($$result2, "Image", $$Image, { "class": "inset-0 object-cover object-top w-full rounded-md shadow-lg md:absolute md:h-full bg-gray-400 dark:bg-slate-700", "widths": [400, 768], "sizes": "(max-width: 768px) 100vw, 432px", "width": 432, "height": 768, "layout": "cover", "src": image?.src, "alt": image?.alt || "" })}`} </div>`} </div> ` })}`;
}, "/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/components/widgets/Steps.astro", void 0);

const logoicon = new Proxy({"src":"/_astro/logo.BK6U1qto.png","width":750,"height":750,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/assets/images/icons/logo.png";
							}
							
							return target[name];
						}
					});

const logo = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: logoicon
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$8 = createAstro("https://furkaneyazici.netlify.app");
const $$Logo = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Logo;
  return renderTemplate`${renderComponent($$result, "Image", $$Image$1, { "src": logoicon, "class": "logo", "alt": "Logo", "width": 40, "height": 40 })} ${maybeRenderHead()}<span class="self-center ml-2 rtl:ml-0 rtl:mr-2 text-2xl md:text-xl font-bold text-gray-900 whitespace-nowrap dark:text-white">
The FEY
</span>`;
}, "/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/components/Logo.astro", void 0);

const $$Astro$7 = createAstro("https://furkaneyazici.netlify.app");
const $$ToggleTheme = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$ToggleTheme;
  const {
    label = "Toggle between Dark and Light mode",
    class: className = "text-muted dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 inline-flex items-center",
    iconClass = "w-6 h-6",
    iconName = "tabler:sun"
  } = Astro2.props;
  return renderTemplate`${!(UI.theme && UI.theme.endsWith(":only")) && renderTemplate`${maybeRenderHead()}<button type="button"${addAttribute(className, "class")}${addAttribute(label, "aria-label")} data-aw-toggle-color-scheme>${renderComponent($$result, "Icon", $$Icon, { "name": iconName, "class": iconClass })}</button>`}`;
}, "/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/components/common/ToggleTheme.astro", void 0);

const $$Astro$6 = createAstro("https://furkaneyazici.netlify.app");
const $$ToggleMenu = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$ToggleMenu;
  const {
    label = "Toggle Menu",
    class: className = "flex flex-col h-12 w-12 rounded justify-center items-center cursor-pointer group"
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<button${addAttribute(className, "class")}${addAttribute(label, "aria-label")} data-aw-toggle-menu> <span class="sr-only">${label}</span> ${renderSlot($$result, $$slots["default"], renderTemplate` <span aria-hidden="true" class="h-0.5 w-6 my-1 rounded-full bg-black dark:bg-white transition ease transform duration-200 opacity-80 group-[.expanded]:rotate-45 group-[.expanded]:translate-y-2.5"></span> <span aria-hidden="true" class="h-0.5 w-6 my-1 rounded-full bg-black dark:bg-white transition ease transform duration-200 opacity-80 group-[.expanded]:opacity-0"></span> <span aria-hidden="true" class="h-0.5 w-6 my-1 rounded-full bg-black dark:bg-white transition ease transform duration-200 opacity-80 group-[.expanded]:-rotate-45 group-[.expanded]:-translate-y-2.5"></span> `)} </button>`;
}, "/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/components/common/ToggleMenu.astro", void 0);

const $$Astro$5 = createAstro("https://furkaneyazici.netlify.app");
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Header;
  const {
    id = "header",
    links = [],
    actions = [],
    isSticky = false,
    isDark = false,
    isFullWidth = false,
    showToggleTheme = false,
    showRssFeed = false,
    position = "center"
  } = Astro2.props;
  const currentPath = `/${trimSlash(new URL(Astro2.url).pathname)}`;
  return renderTemplate`${maybeRenderHead()}<header${addAttribute([
    { sticky: isSticky, relative: !isSticky, dark: isDark },
    "top-0 z-40 flex-none mx-auto w-full border-b border-gray-50/0 transition-[opacity] ease-in-out"
  ], "class:list")}${spreadAttributes(isSticky ? { "data-aw-sticky-header": true } : {})}${spreadAttributes(id ? { id } : {})}> <div class="absolute inset-0"></div> <div${addAttribute([
    "relative text-default py-3 px-3 md:px-6 mx-auto w-full md:flex md:justify-between",
    {
      "max-w-7xl": !isFullWidth
    }
  ], "class:list")}> <div${addAttribute([{ "mr-auto rtl:mr-0 rtl:ml-auto": position === "right" }, "flex justify-between"], "class:list")}> <a class="flex items-center"${addAttribute(getHomePermalink(), "href")}> ${renderComponent($$result, "Logo", $$Logo, {})} </a> <div class="flex items-center md:hidden"> ${renderComponent($$result, "ToggleMenu", $$ToggleMenu, {})} </div> </div> <nav class="items-center w-full md:w-auto hidden md:flex text-default overflow-y-auto overflow-x-hidden md:overflow-y-visible md:overflow-x-auto md:mx-5" aria-label="Main navigation"> <ul class="flex flex-col md:flex-row md:self-center w-full md:w-auto text-xl md:text-[0.9375rem] tracking-[0.01rem] font-medium"> ${links.map(({ text, href, links: links2 }) => renderTemplate`<li${addAttribute(links2?.length ? "dropdown" : "", "class")}> ${links2?.length ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` <button class="hover:text-link dark:hover:text-white px-4 py-3 flex items-center"> ${text} ${renderComponent($$result2, "Icon", $$Icon, { "name": "tabler:chevron-down", "class": "w-3.5 h-3.5 ml-0.5 rtl:ml-0 rtl:mr-0.5 hidden md:inline" })} </button> <ul class="dropdown-menu md:backdrop-blur-md dark:md:bg-dark rounded md:absolute pl-4 md:pl-0 md:hidden font-medium md:bg-white/90 md:min-w-[200px] drop-shadow-xl"> ${links2.map(({ text: text2, href: href2 }) => renderTemplate`<li> <a${addAttribute([
    "first:rounded-t last:rounded-b md:hover:bg-gray-100 hover:text-link dark:hover:text-white dark:hover:bg-gray-700 py-2 px-5 block whitespace-no-wrap",
    { "aw-link-active": href2 === currentPath }
  ], "class:list")}${addAttribute(href2, "href")}> ${text2} </a> </li>`)} </ul> ` })}` : renderTemplate`<a${addAttribute([
    "hover:text-link dark:hover:text-white px-4 py-3 flex items-centers",
    { "aw-link-active": href === currentPath }
  ], "class:list")}${addAttribute(href, "href")}> ${text} </a>`} </li>`)} </ul> </nav> <div${addAttribute([
    { "ml-auto rtl:ml-0 rtl:mr-auto": position === "left" },
    "hidden md:self-center md:flex items-center md:mb-0 fixed w-full md:w-auto md:static justify-end left-0 rtl:left-auto rtl:right-0 bottom-0 p-3 md:p-0"
  ], "class:list")}> <div class="items-center flex justify-between w-full md:w-auto"> <div class="flex"> ${showToggleTheme && renderTemplate`${renderComponent($$result, "ToggleTheme", $$ToggleTheme, { "iconClass": "w-6 h-6 md:w-5 md:h-5 md:inline-block" })}`} ${showRssFeed && renderTemplate`<a class="text-muted dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 inline-flex items-center" aria-label="RSS Feed"${addAttribute(getAsset("/rss.xml"), "href")}> ${renderComponent($$result, "Icon", $$Icon, { "name": "tabler:rss", "class": "w-5 h-5" })} </a>`} </div> ${actions?.length ? renderTemplate`<span class="ml-4 rtl:ml-0 rtl:mr-4"> ${actions.map((btnProps) => renderTemplate`${renderComponent($$result, "Button", $$Button, { ...btnProps, "class": "ml-2 py-2.5 px-5.5 md:px-6 font-semibold shadow-none text-sm w-auto" })}`)} </span>` : ""} </div> </div> </div> </header>`;
}, "/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/components/widgets/Header.astro", void 0);

const $$Astro$4 = createAstro("https://furkaneyazici.netlify.app");
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Footer;
  const { socialLinks = [], theme = "light" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<footer${addAttribute([{ dark: theme === "dark" }, "relative border-t border-gray-200 dark:border-slate-800 not-prose"], "class:list")}> <div class="dark:bg-dark absolute inset-0 pointer-events-none" aria-hidden="true"></div> <div class="relative max-w-7xl mx-auto px-4 sm:px-6 dark:text-slate-300"> <div class="grid grid-cols-12 gap-4 gap-y-8 sm:gap-8 py-8 md:py-12"> <div class="col-span-12 lg:col-span-4"> <div class="mb-2"> <a class="inline-block font-bold text-xl"${addAttribute(getHomePermalink(), "href")}>${SITE?.name}</a> </div> </div> </div> <div class="md:flex md:items-center md:justify-between py-6 md:py-8"> ${socialLinks?.length ? renderTemplate`<ul class="flex mb-4 md:order-1 -ml-2 md:ml-4 md:mb-0 rtl:ml-0 rtl:-mr-2 rtl:md:ml-0 rtl:md:mr-4"> ${socialLinks.map(({ ariaLabel, href, text, icon }) => renderTemplate`<li> <a class="text-muted dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 inline-flex items-center"${addAttribute(ariaLabel, "aria-label")}${addAttribute(href, "href")}> ${icon && renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": icon, "class": "w-5 h-5" })}`} ${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(text)}` })} </a> </li>`)} </ul>` : ""} <div class="text-sm mr-4 dark:text-muted"> <span class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 rtl:mr-0 rtl:ml-1.5 float-left rtl:float-right rounded-sm">${renderComponent($$result, "Image", $$Image$1, { "src": logoicon, "class": "logo", "alt": "Logo", "width": 50, "height": 50 })} </span>
Made by <a class="text-blue-600 underline dark:text-muted" href="https://github.com/nonsensicalinsane "> The FEY</a> </div> </div> </div> </footer>`;
}, "/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/components/widgets/Footer.astro", void 0);

const headerData = {
  links: [{
    text: 'Home',
    href: '/'
  }, {
    text: 'About',
    href: '/about'
  }, {
    text: 'Projects',
    href: '/projects'
  }, {
    text: 'Blog',
    href: '/blog'
  }]
};
const footerData = {
  socialLinks: [{
    ariaLabel: 'X',
    icon: 'tabler:brand-x',
    href: 'https://twitter.com/furkaneyazici',
    target: "_blank"
  }, {
    ariaLabel: 'Instagram',
    icon: 'tabler:brand-instagram',
    href: 'https://instagram.com/nonsensicalinsane',
    target: "_blank"
  }, {
    ariaLabel: 'RSS',
    icon: 'tabler:rss',
    href: getAsset('/rss.xml'),
    target: "_blank"
  }, {
    ariaLabel: 'Github',
    icon: 'tabler:brand-github',
    href: 'https://github.com/nonsensicalinsane',
    target: "_blank"
  }, {
    ariaLabel: 'Linkedin',
    icon: 'tabler:brand-linkedin',
    href: 'https://linkedin.com/in/nonsensicalinsane',
    target: "_blank"
  }, {
    ariaLabel: 'Email',
    icon: 'tabler:mail',
    href: 'mailto:yazici.furkan@proton.me',
    target: "_blank"
  }, {
    ariaLabel: 'Upwork',
    icon: 'tabler:brand-upwork',
    href: 'https://www.upwork.com/freelancers/~01ae41556331664a51',
    target: "_blank"
  }, {
    ariaLabel: 'Youtube',
    icon: 'tabler:brand-youtube',
    href: 'https://www.youtube.com/@furkaneyazici',
    target: "_blank"
  }]
};

const $$Astro$3 = createAstro("https://furkaneyazici.netlify.app");
const $$PageLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$PageLayout;
  const { metadata } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "metadata": metadata }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["header"], renderTemplate` ${renderComponent($$result2, "Header", $$Header, { ...headerData, "isSticky": true, "showRssFeed": true, "showToggleTheme": true })} `)} ${maybeRenderHead()}<main> ${renderSlot($$result2, $$slots["default"])} </main> ${renderSlot($$result2, $$slots["footer"], renderTemplate` ${renderComponent($$result2, "Footer", $$Footer, { ...footerData })} `)} ` })}`;
}, "/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/layouts/PageLayout.astro", void 0);

const $$Astro$2 = createAstro("https://furkaneyazici.netlify.app");
const $$ItemGrid = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ItemGrid;
  const { items = [], columns, defaultIcon = "", classes = {} } = Astro2.props;
  const {
    container: containerClass = "",
    panel: panelClass = "",
    title: titleClass = "",
    description: descriptionClass = "",
    icon: defaultIconClass = "text-primary",
    action: actionClass = ""
  } = classes;
  return renderTemplate`${items && renderTemplate`${maybeRenderHead()}<div${addAttribute(twMerge(
    `grid mx-auto gap-8 md:gap-y-12 ${columns === 4 ? "lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2" : columns === 3 ? "lg:grid-cols-3 sm:grid-cols-2" : columns === 2 ? "sm:grid-cols-2 " : ""}`,
    containerClass
  ), "class")}>${items.map(({ title, description, icon, callToAction, classes: itemClasses = {} }) => renderTemplate`<div><div${addAttribute(twMerge("flex flex-row max-w-md", panelClass, itemClasses?.panel), "class")}><div class="flex justify-center">${(icon || defaultIcon) && renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": icon || defaultIcon, "class": twMerge("w-7 h-7 mr-2 rtl:mr-0 rtl:ml-2", defaultIconClass, itemClasses?.icon) })}`}</div><div class="mt-0.5">${title && renderTemplate`<h3${addAttribute(twMerge("text-xl font-bold", titleClass, itemClasses?.title), "class")}>${title}</h3>`}${description && renderTemplate`<p${addAttribute(twMerge(`${title ? "mt-3" : ""} text-muted`, descriptionClass, itemClasses?.description), "class")}>${unescapeHTML(description)}</p>`}${callToAction && renderTemplate`<div${addAttribute(twMerge(
    `${title || description ? "mt-3" : ""}`,
    actionClass,
    itemClasses?.actionClass
  ), "class")}>${renderComponent($$result, "Button", $$Button, { "variant": "link", ...callToAction })}</div>`}</div></div></div>`)}</div>`}`;
}, "/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/components/ui/ItemGrid.astro", void 0);

const $$Astro$1 = createAstro("https://furkaneyazici.netlify.app");
const $$Content = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Content;
  const {
    title = await Astro2.slots.render("title"),
    subtitle = await Astro2.slots.render("subtitle"),
    tagline,
    content = await Astro2.slots.render("content"),
    callToAction,
    items = [],
    columns,
    callPageName = await Astro2.slots.render("callPageName"),
    callPagePath = await Astro2.slots.render("callPagePath"),
    image = await Astro2.slots.render("image"),
    isReversed = false,
    id,
    isDark = false,
    classes = {},
    bg = await Astro2.slots.render("bg")
  } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "WidgetWrapper", $$WidgetWrapper, { "id": id, "isDark": isDark, "containerClass": `max-w-7xl mx-auto pt-2 md:pt-2 lg:pt-2 ${classes?.container ?? ""}`, "bg": bg }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Headline", $$Headline, { "title": title, "subtitle": subtitle, "tagline": tagline, "classes": {
    container: "max-w-xl sm:mx-auto lg:max-w-2xl",
    title: "text-4xl md:text-5xl font-bold leading-tighter tracking-tighter mb-4 font-heading",
    subtitle: "max-w-3xl mx-auto sm:text-center text-xl text-muted dark:text-slate-400"
  }, "callPageName": callPageName, "callPagePath": callPagePath })} ${maybeRenderHead()}<div class="mx-auto max-w-7xl px-4 py-2 md:px-8"> <div${addAttribute(`md:flex ${isReversed ? "md:flex-row-reverse" : ""} md:gap-16`, "class")}> <div class="md:basis-1/2 self-center"> ${content && renderTemplate`<div class="mb-12 text-lg dark:text-slate-400">${unescapeHTML(content)}</div>`} ${callToAction && renderTemplate`<div class="mt-[-40px] mb-8 text-primary"> ${renderComponent($$result2, "Button", $$Button, { "variant": "link", ...callToAction })} </div>`} ${renderComponent($$result2, "ItemGrid", $$ItemGrid, { "items": items, "columns": columns, "defaultIcon": "tabler:check", "classes": {
    container: `gap-y-4 md:gap-y-8`,
    panel: "max-w-none",
    title: "text-lg font-medium leading-6 dark:text-white ml-2 rtl:ml-0 rtl:mr-2",
    description: "text-muted dark:text-slate-400 ml-2 rtl:ml-0 rtl:mr-2",
    icon: "flex h-7 w-7 items-center justify-center rounded-full bg-green-600 dark:bg-green-700 text-gray-50 p-1",
    action: "text-lg font-medium leading-6 dark:text-white ml-2 rtl:ml-0 rtl:mr-2"
  } })} </div> <div aria-hidden="true" class="mt-10 md:mt-0 md:basis-1/2"> ${image && renderTemplate`<div class="relative m-auto max-w-4xl"> ${typeof image === "string" ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${unescapeHTML(image)}` })}` : renderTemplate`${renderComponent($$result2, "Image", $$Image, { "class": "mx-auto w-full rounded-lg bg-gray-500 shadow-lg", "width": 500, "height": 500, "widths": [400, 768], "sizes": "(max-width: 768px) 100vw, 432px", "layout": "responsive", ...image })}`} </div>`} </div> </div> </div> ` })}`;
}, "/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/components/widgets/Content.astro", void 0);

const $$Astro = createAstro("https://furkaneyazici.netlify.app");
const $$About = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$About;
  const metadata = {
    title: "Who am I?"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, { "metadata": metadata }, { "default": ($$result2) => renderTemplate`   ${renderComponent($$result2, "Hero", $$Hero, {}, { "title": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "title" }, { "default": ($$result4) => renderTemplate` ${maybeRenderHead()}<h1 class="text-4xl font-bold tracking-tight dark:text-white sm:text-5xl">
Hi, I'm <span class="text-blue-600 dark:text-blue-400">FEY!</span> </h1> ` })}` })} ${renderComponent($$result2, "Content", $$Content, { "id": "about", "columns": 3, "items": [
    {
      icon: "tabler:brand-github",
      callToAction: {
        target: "_blank",
        text: "Github",
        href: "https://www.github.com/nonsensicalinsane"
      }
    },
    {
      icon: "tabler:brand-linkedin",
      callToAction: {
        target: "_blank",
        text: "LinkedIn",
        href: "https://www.linkedin.com/nonsensicalinsane"
      }
    }
  ], "image": {
    src: "~/assets/images/me.png",
    alt: "Furkan E\u015Fref Yaz\u0131c\u0131",
    loading: "eager"
  }, "callToAction": {
    text: "Download my resume!",
    icon: "tabler:chevron-right",
    href: "/src/assets/pdf/Furkan_E\u015Fref_Yaz\u0131c\u0131_CV.pdf",
    target: "_blank"
  } }, { "bg": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "bg" }, { "default": ($$result4) => renderTemplate` <div class="absolute inset-0 bg-blue-50 dark:bg-transparent"></div> ` })}`, "content": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "content" }, { "default": ($$result4) => renderTemplate` <h2 class="text-2xl font-bold tracking-tight dark:text-white sm:text-3xl mb-2">About me</h2> <p>
Hello, I am an interdisciplinary researcher who is passionate about exploring various fields, conducting research in these areas, and endeavoring to transform my studies into projects. In addition to my areas of interest, I am also a computational physicist. The specific areas I am specializing in primarily involve the mathematical and theoretical aspects of deep learning and quantum computing, as well as their applications to various other fields. Due to my passion for research, I have been involved in numerous research groups during my undergraduate studies to enhance my skills. Additionally, to reach out to a broader audience, I co-founded a community at my university with my friends and organized various events, including a hackathon. Furthermore, during my time with QTurkey, I worked on several projects to educate people. Although I may not always achieve the desired results, through this website I have created, I will continue to strive to inform more individuals and further develop myself.
</p> ` })}` })} ${renderComponent($$result2, "Steps", $$Steps, { "id": "research-experience", "title": "Research experience", "items": [
    {
      title: 'Undergraduate Research Assistant <br /> <span class="font-normal">Simply Complex Lab - Ankara, Turkey</span> <br /> <span class="text-sm font-normal">Nov 2021 - Present</span>',
      description: `The laboratory's research area centers on intricate, far-from-equilibrium phenomena. As an integral component of broader collaborative investigations, I contributed to the cross-correlation analysis of hyperuniformity dynamics within a colloidal system, employing principles from the domain of fluid dynamics. Presently, my research entails an examination of causal network analysis concerning the emergence of hyperuniformity within this system. I am actively engaged in the development of Python code to assess causality resulting from interparticle collisions. <br> Supervisor: Dr. Serim \u0130lday`,
      icon: "tabler:microscope"
    },
    {
      title: 'Undergraduate Research Assistant <br /> <span class="font-normal">IVMER The Research and Application - Ankara, Turkey</span> <br /> <span class="text-sm font-normal">Feb 2020 - Jun 2022</span>',
      description: `Contributed to Quantum Convolutional Neural Networks (QCNN) for image detection utilizing various quantum gate algorithms. Also, applied Quantum Machine Learning techniques to address the 'Travelling Salesman' problem within a research team.<br> Supervisor: Prof. M. Bilge Demirk\xF6z `,
      icon: "tabler:microscope"
    }
  ], "classes": { container: "max-w-3xl" } })} ${renderComponent($$result2, "Steps", $$Steps, { "id": "work-experience", "title": "Work experience", "items": [
    {
      title: 'Outreach Coordinator <br /> <span class="font-normal"><a href="https://www.qturkey.org" target="_blank">QTurkey</a></span> <br /> <span class="text-sm font-normal">Sep 2021 - Jan 2023</span>',
      description: `- The aim of the QTurkey (Quantum Turkey) community is to spread quantum technologies and raise awareness through events held in Turkey.
                      <br>- As the Outreach Team, our aim is to ensure the growth of the QTurkey community, establish domestic and international collaborations, and to keep the QTurkey family active by organizing new events.`,
      icon: "tabler:briefcase"
    },
    {
      title: 'Internship, Coordinator <br /> <span class="font-normal"><a href="https://www.qworld.net" target="_blank">QWorld</a></span> <br /> <span class="text-sm font-normal">Jul 2021 - Aug 2021</span>',
      description: `The project is included the website and classification of all courses and related stuffs. The website is: <span class='text-red-600 dark:text-red-400'><a href="https://github.com/GehadSalemFekry/QMap" target="_blank">qmap.qworld.net</a> </span> <br> Supervisor: <a href="https://scholar.google.com/citations?user=vbMPLTMAAAAJ&hl=en" target="_blank">Zeki Can Seskir</a>`,
      icon: "tabler:briefcase"
    },
    {
      title: "Internship, Industrial Automation <br /> <span class='font-normal'><a href='http://www.altinay.com/en/home/' target='_blank'>ALTINAY Technology Group - Istanbul, Turkey</a></span> <br /> <span class='text-sm font-normal'>Summer 2017</span>",
      icon: "tabler:briefcase"
    },
    {
      title: 'Internship, Electrical Maintenance Technician <br /> <span class="font-normal"><a href="https://www.kanca.com.tr/" target="_blank">KANCA - Istanbul, Turkey</a></span> <br /> <span class="text-sm font-normal">Summer 2016</span>',
      icon: "tabler:briefcase"
    }
  ], "classes": { container: "max-w-3xl" } })}  ${renderComponent($$result2, "Steps", $$Steps, { "id": "education", "title": "Education", "items": [
    {
      title: `Middle East Technical University<br /> <span class="font-normal">Bachelor of Science in Physics</span> <br /> <span class="text-sm font-normal">2018 - 2020</span>`,
      icon: "tabler:school",
      description: "I have taken these for my concentration and extra courses: <br> CENG 501: Deep Learning <br> PHYS 409: Physics of Condensed Matter I <br> PHYS 312: Elementary of Solid State<br> PHYS 495: Group Theory in Physics<br> PHYS 444: Computational Physics II<br> BIOL 106: Biology <br> BIOL 317: Molecular Biology <br>  "
    },
    {
      title: ` Technical School ENKA Anatolian High School <br /> <span class="font-normal">Industrial Automation </span> <br /> <span class="text-sm font-normal">2014 - 2018</span>`,
      icon: "tabler:school"
    }
  ], "classes": { container: "max-w-3xl" } })} ${renderComponent($$result2, "Steps", $$Steps, { "id": "certifications", "title": "Certifications", "items": [
    {
      title: `<a href="https://coursera.org/share/bd44b9059c4517a867fad0664b0e406d" target="_blank">IBM Data Science Professional Certificate</a> <br /> <span class="font-normal">IBM - Coursera</span>`,
      icon: "tabler:certificate",
      description: "I completed the IBM Data Science Professional Certificate, a rigorous program covering data science fundamentals, machine learning, and practical project work. This certificate demonstrates my proficiency in data analysis, Python programming, and the use of industry-standard tools and libraries. It showcases my readiness for data science roles and highlights my commitment to ongoing skill development. <br> Capstone Project:  <span class='text-red-600 dark:text-red-400'><a href='https://github.com/NonsensicalInsane/IBMDataScienceCourse' target='_blank'>SpaceX Launch Success Analysis</a></span>"
    },
    {
      title: `<a href="https://coursera.org/share/5d9bc17f9ad0748a5ddd18392041e7f3" target="_blank">Google Data Analytics Professional Certificate</a> <br /> <span class="font-normal">Google - Coursera</span>`,
      icon: "tabler:certificate",
      description: "I acquired key skills in data cleaning, analysis, and visualization using spreadsheets, SQL, R programming, and Tableau. I learned to organize and analyze data, create visualizations, and present findings effectively. Developed expertise in spreadsheet usage, data ethics, problem-solving, and decision-making. Proficient in SQL querying, Tableau software, R programming, and creating job portfolios with case studies."
    },
    {
      title: '<a href="https://portal.neuromatchacademy.org/certificate/924f0e9d-1fa4-44a7-8ae5-9e218b707508" target="_blank">Deep Learning</a> </br> <span class="font-normal">Neuromatch Academy</span> <br /> <span class="text-sm font-normal">August 2021</span>',
      icon: "tabler:certificate",
      description: " Completed Neuromatch's Deep Learning course, focusing on advanced neural network architectures and applications. Learned to design, train, and implement deep learning models for tasks such as image recognition and natural language processing, utilizing frameworks like TensorFlow and PyTorch."
    },
    {
      title: '<a href="https://portal.neuromatchacademy.org/certificate/d8922efe-9a30-460d-97aa-759f9b2a6e20" target="_blank">Computational Neuroscience</a> </br> <span class="font-normal">Neuromatch Academy</span> <br /> <span class="text-sm font-normal">August 2021</span>',
      icon: "tabler:certificate",
      description: "Completed the Neuromatch Computational Neuroscience course, focusing on computational techniques for understanding brain function. Gained skills in neural data analysis, modeling of neural systems, and applying machine learning to neuroscience research."
    },
    {
      title: '<a href="https://drive.google.com/file/d/1SJ-ukSxDxv2DZesPCvr86eufqZYWmpJJ/view" target="_blank">Qiskit Summer School Quantum Machine Learning</a> </br> <span class="font-normal">IBM Qiskit</span> <br /> <span class="text-sm font-normal">August 2021</span>',
      icon: "tabler:certificate",
      description: "Completed IBM's Qiskit Quantum Machine Learning course, learning to apply quantum computing in machine learning. Gained skills in quantum algorithm implementation and optimization using Qiskit."
    }
  ], "classes": { container: "max-w-3xl" } })} `, "header": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "header" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Header", $$Header, { "links": [
    {
      text: "Home",
      href: "/"
    },
    {
      text: "About",
      links: [
        {
          text: "Research",
          href: "#research-experience"
        },
        {
          text: "Work",
          href: "#work-experience"
        },
        {
          text: "Education",
          href: "#education"
        },
        {
          text: "Certifications",
          href: "#certifications"
        }
      ]
    },
    {
      text: "Project",
      href: "/projects"
    },
    {
      text: "Blog",
      href: "/blog"
    }
  ], "isSticky": true })} ` })}` })}`;
}, "/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/pages/about.astro", void 0);

const $$file = "/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/pages/about.astro";
const $$url = "/about";

const about = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Button as $, $$WidgetWrapper as a, $$Headline as b, $$Icon as c, $$PageLayout as d, $$Image as e, $$ItemGrid as f, $$Hero as g, $$Content as h, $$Header as i, about as j, logo as l };