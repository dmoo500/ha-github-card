/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const T = globalThis, V = T.ShadowRoot && (T.ShadyCSS === void 0 || T.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, W = Symbol(), Y = /* @__PURE__ */ new WeakMap();
let he = class {
  constructor(e, t, s) {
    if (this._$cssResult$ = !0, s !== W) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (V && e === void 0) {
      const s = t !== void 0 && t.length === 1;
      s && (e = Y.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && Y.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const be = (i) => new he(typeof i == "string" ? i : i + "", void 0, W), de = (i, ...e) => {
  const t = i.length === 1 ? i[0] : e.reduce((s, r, o) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + i[o + 1], i[0]);
  return new he(t, i, W);
}, $e = (i, e) => {
  if (V) i.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const s = document.createElement("style"), r = T.litNonce;
    r !== void 0 && s.setAttribute("nonce", r), s.textContent = t.cssText, i.appendChild(s);
  }
}, ee = V ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const s of e.cssRules) t += s.cssText;
  return be(t);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: we, defineProperty: ye, getOwnPropertyDescriptor: xe, getOwnPropertyNames: Ae, getOwnPropertySymbols: ke, getPrototypeOf: Ce } = Object, L = globalThis, te = L.trustedTypes, Ee = te ? te.emptyScript : "", Se = L.reactiveElementPolyfillSupport, O = (i, e) => i, N = { toAttribute(i, e) {
  switch (e) {
    case Boolean:
      i = i ? Ee : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, e) {
  let t = i;
  switch (e) {
    case Boolean:
      t = i !== null;
      break;
    case Number:
      t = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(i);
      } catch {
        t = null;
      }
  }
  return t;
} }, F = (i, e) => !we(i, e), se = { attribute: !0, type: String, converter: N, reflect: !1, useDefault: !1, hasChanged: F };
Symbol.metadata ??= Symbol("metadata"), L.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let y = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = se) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const s = Symbol(), r = this.getPropertyDescriptor(e, s, t);
      r !== void 0 && ye(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, t, s) {
    const { get: r, set: o } = xe(this.prototype, e) ?? { get() {
      return this[t];
    }, set(n) {
      this[t] = n;
    } };
    return { get: r, set(n) {
      const h = r?.call(this);
      o?.call(this, n), this.requestUpdate(e, h, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? se;
  }
  static _$Ei() {
    if (this.hasOwnProperty(O("elementProperties"))) return;
    const e = Ce(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(O("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(O("properties"))) {
      const t = this.properties, s = [...Ae(t), ...ke(t)];
      for (const r of s) this.createProperty(r, t[r]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [s, r] of t) this.elementProperties.set(s, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, s] of this.elementProperties) {
      const r = this._$Eu(t, s);
      r !== void 0 && this._$Eh.set(r, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const r of s) t.unshift(ee(r));
    } else e !== void 0 && t.push(ee(e));
    return t;
  }
  static _$Eu(e, t) {
    const s = t.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
  }
  addController(e) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const s of t.keys()) this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return $e(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, t, s) {
    this._$AK(e, s);
  }
  _$ET(e, t) {
    const s = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, s);
    if (r !== void 0 && s.reflect === !0) {
      const o = (s.converter?.toAttribute !== void 0 ? s.converter : N).toAttribute(t, s.type);
      this._$Em = e, o == null ? this.removeAttribute(r) : this.setAttribute(r, o), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const s = this.constructor, r = s._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const o = s.getPropertyOptions(r), n = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : N;
      this._$Em = r;
      const h = n.fromAttribute(t, o.type);
      this[r] = h ?? this._$Ej?.get(r) ?? h, this._$Em = null;
    }
  }
  requestUpdate(e, t, s, r = !1, o) {
    if (e !== void 0) {
      const n = this.constructor;
      if (r === !1 && (o = this[e]), s ??= n.getPropertyOptions(e), !((s.hasChanged ?? F)(o, t) || s.useDefault && s.reflect && o === this._$Ej?.get(e) && !this.hasAttribute(n._$Eu(e, s)))) return;
      this.C(e, t, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: s, reflect: r, wrapped: o }, n) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, n ?? t ?? this[e]), o !== !0 || n !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (t = void 0), this._$AL.set(e, t)), r === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [r, o] of this._$Ep) this[r] = o;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [r, o] of s) {
        const { wrapped: n } = o, h = this[r];
        n !== !0 || this._$AL.has(r) || h === void 0 || this.C(r, void 0, o, h);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(t)) : this._$EM();
    } catch (s) {
      throw e = !1, this._$EM(), s;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((t) => t.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq &&= this._$Eq.forEach((t) => this._$ET(t, this[t])), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[O("elementProperties")] = /* @__PURE__ */ new Map(), y[O("finalized")] = /* @__PURE__ */ new Map(), Se?.({ ReactiveElement: y }), (L.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const I = globalThis, re = (i) => i, M = I.trustedTypes, ie = M ? M.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, ue = "$lit$", m = `lit$${Math.random().toFixed(9).slice(2)}$`, pe = "?" + m, Pe = `<${pe}>`, w = document, R = () => w.createComment(""), z = (i) => i === null || typeof i != "object" && typeof i != "function", B = Array.isArray, Oe = (i) => B(i) || typeof i?.[Symbol.iterator] == "function", G = `[ 	
\f\r]`, E = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, oe = /-->/g, ne = />/g, b = RegExp(`>|${G}(?:([^\\s"'>=/]+)(${G}*=${G}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ae = /'/g, le = /"/g, fe = /^(?:script|style|textarea|title)$/i, Re = (i) => (e, ...t) => ({ _$litType$: i, strings: e, values: t }), d = Re(1), A = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), ce = /* @__PURE__ */ new WeakMap(), $ = w.createTreeWalker(w, 129);
function _e(i, e) {
  if (!B(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ie !== void 0 ? ie.createHTML(e) : e;
}
const ze = (i, e) => {
  const t = i.length - 1, s = [];
  let r, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", n = E;
  for (let h = 0; h < t; h++) {
    const c = i[h];
    let l, u, a = -1, f = 0;
    for (; f < c.length && (n.lastIndex = f, u = n.exec(c), u !== null); ) f = n.lastIndex, n === E ? u[1] === "!--" ? n = oe : u[1] !== void 0 ? n = ne : u[2] !== void 0 ? (fe.test(u[2]) && (r = RegExp("</" + u[2], "g")), n = b) : u[3] !== void 0 && (n = b) : n === b ? u[0] === ">" ? (n = r ?? E, a = -1) : u[1] === void 0 ? a = -2 : (a = n.lastIndex - u[2].length, l = u[1], n = u[3] === void 0 ? b : u[3] === '"' ? le : ae) : n === le || n === ae ? n = b : n === oe || n === ne ? n = E : (n = b, r = void 0);
    const _ = n === b && i[h + 1].startsWith("/>") ? " " : "";
    o += n === E ? c + Pe : a >= 0 ? (s.push(l), c.slice(0, a) + ue + c.slice(a) + m + _) : c + m + (a === -2 ? h : _);
  }
  return [_e(i, o + (i[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class H {
  constructor({ strings: e, _$litType$: t }, s) {
    let r;
    this.parts = [];
    let o = 0, n = 0;
    const h = e.length - 1, c = this.parts, [l, u] = ze(e, t);
    if (this.el = H.createElement(l, s), $.currentNode = this.el.content, t === 2 || t === 3) {
      const a = this.el.content.firstChild;
      a.replaceWith(...a.childNodes);
    }
    for (; (r = $.nextNode()) !== null && c.length < h; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const a of r.getAttributeNames()) if (a.endsWith(ue)) {
          const f = u[n++], _ = r.getAttribute(a).split(m), g = /([.?@])?(.*)/.exec(f);
          c.push({ type: 1, index: o, name: g[2], strings: _, ctor: g[1] === "." ? Ue : g[1] === "?" ? Te : g[1] === "@" ? Ne : q }), r.removeAttribute(a);
        } else a.startsWith(m) && (c.push({ type: 6, index: o }), r.removeAttribute(a));
        if (fe.test(r.tagName)) {
          const a = r.textContent.split(m), f = a.length - 1;
          if (f > 0) {
            r.textContent = M ? M.emptyScript : "";
            for (let _ = 0; _ < f; _++) r.append(a[_], R()), $.nextNode(), c.push({ type: 2, index: ++o });
            r.append(a[f], R());
          }
        }
      } else if (r.nodeType === 8) if (r.data === pe) c.push({ type: 2, index: o });
      else {
        let a = -1;
        for (; (a = r.data.indexOf(m, a + 1)) !== -1; ) c.push({ type: 7, index: o }), a += m.length - 1;
      }
      o++;
    }
  }
  static createElement(e, t) {
    const s = w.createElement("template");
    return s.innerHTML = e, s;
  }
}
function k(i, e, t = i, s) {
  if (e === A) return e;
  let r = s !== void 0 ? t._$Co?.[s] : t._$Cl;
  const o = z(e) ? void 0 : e._$litDirective$;
  return r?.constructor !== o && (r?._$AO?.(!1), o === void 0 ? r = void 0 : (r = new o(i), r._$AT(i, t, s)), s !== void 0 ? (t._$Co ??= [])[s] = r : t._$Cl = r), r !== void 0 && (e = k(i, r._$AS(i, e.values), r, s)), e;
}
class He {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: s } = this._$AD, r = (e?.creationScope ?? w).importNode(t, !0);
    $.currentNode = r;
    let o = $.nextNode(), n = 0, h = 0, c = s[0];
    for (; c !== void 0; ) {
      if (n === c.index) {
        let l;
        c.type === 2 ? l = new U(o, o.nextSibling, this, e) : c.type === 1 ? l = new c.ctor(o, c.name, c.strings, this, e) : c.type === 6 && (l = new Me(o, this, e)), this._$AV.push(l), c = s[++h];
      }
      n !== c?.index && (o = $.nextNode(), n++);
    }
    return $.currentNode = w, r;
  }
  p(e) {
    let t = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, t), t += s.strings.length - 2) : s._$AI(e[t])), t++;
  }
}
class U {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, s, r) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = s, this.options = r, this._$Cv = r?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = k(this, e, t), z(e) ? e === p || e == null || e === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : e !== this._$AH && e !== A && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Oe(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== p && z(this._$AH) ? this._$AA.nextSibling.data = e : this.T(w.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: s } = e, r = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = H.createElement(_e(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === r) this._$AH.p(t);
    else {
      const o = new He(r, this), n = o.u(this.options);
      o.p(t), this.T(n), this._$AH = o;
    }
  }
  _$AC(e) {
    let t = ce.get(e.strings);
    return t === void 0 && ce.set(e.strings, t = new H(e)), t;
  }
  k(e) {
    B(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let s, r = 0;
    for (const o of e) r === t.length ? t.push(s = new U(this.O(R()), this.O(R()), this, this.options)) : s = t[r], s._$AI(o), r++;
    r < t.length && (this._$AR(s && s._$AB.nextSibling, r), t.length = r);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const s = re(e).nextSibling;
      re(e).remove(), e = s;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class q {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, s, r, o) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = p;
  }
  _$AI(e, t = this, s, r) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) e = k(this, e, t, 0), n = !z(e) || e !== this._$AH && e !== A, n && (this._$AH = e);
    else {
      const h = e;
      let c, l;
      for (e = o[0], c = 0; c < o.length - 1; c++) l = k(this, h[s + c], t, c), l === A && (l = this._$AH[c]), n ||= !z(l) || l !== this._$AH[c], l === p ? e = p : e !== p && (e += (l ?? "") + o[c + 1]), this._$AH[c] = l;
    }
    n && !r && this.j(e);
  }
  j(e) {
    e === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Ue extends q {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === p ? void 0 : e;
  }
}
class Te extends q {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== p);
  }
}
class Ne extends q {
  constructor(e, t, s, r, o) {
    super(e, t, s, r, o), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = k(this, e, t, 0) ?? p) === A) return;
    const s = this._$AH, r = e === p && s !== p || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, o = e !== p && (s === p || r);
    r && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Me {
  constructor(e, t, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    k(this, e);
  }
}
const De = I.litHtmlPolyfillSupport;
De?.(H, U), (I.litHtmlVersions ??= []).push("3.3.2");
const Le = (i, e, t) => {
  const s = t?.renderBefore ?? e;
  let r = s._$litPart$;
  if (r === void 0) {
    const o = t?.renderBefore ?? null;
    s._$litPart$ = r = new U(e.insertBefore(R(), o), o, void 0, t ?? {});
  }
  return r._$AI(i), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const K = globalThis;
class x extends y {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Le(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return A;
  }
}
x._$litElement$ = !0, x.finalized = !0, K.litElementHydrateSupport?.({ LitElement: x });
const qe = K.litElementPolyfillSupport;
qe?.({ LitElement: x });
(K.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const je = { attribute: !0, type: String, converter: N, reflect: !1, hasChanged: F }, Ge = (i = je, e, t) => {
  const { kind: s, metadata: r } = t;
  let o = globalThis.litPropertyMetadata.get(r);
  if (o === void 0 && globalThis.litPropertyMetadata.set(r, o = /* @__PURE__ */ new Map()), s === "setter" && ((i = Object.create(i)).wrapped = !0), o.set(t.name, i), s === "accessor") {
    const { name: n } = t;
    return { set(h) {
      const c = e.get.call(this);
      e.set.call(this, h), this.requestUpdate(n, c, i, !0, h);
    }, init(h) {
      return h !== void 0 && this.C(n, void 0, i, h), h;
    } };
  }
  if (s === "setter") {
    const { name: n } = t;
    return function(h) {
      const c = this[n];
      e.call(this, h), this.requestUpdate(n, c, i, !0, h);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function J(i) {
  return (e, t) => typeof t == "object" ? Ge(i, e, t) : ((s, r, o) => {
    const n = r.hasOwnProperty(o);
    return r.constructor.createProperty(o, s), n ? Object.getOwnPropertyDescriptor(r, o) : void 0;
  })(i, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Z(i) {
  return J({ ...i, state: !0, attribute: !1 });
}
function Ve(i) {
  if (i.entities) {
    const e = Object.values(i.entities).filter((t) => t.platform === "github").map((t) => t.entity_id).filter((t) => t in i.states);
    if (e.length > 0) return e;
  }
  return Object.keys(i.states).filter(
    (e) => e.startsWith("github.")
  );
}
const We = {
  stargazers_count: "stars",
  subscribers_count: "watchers",
  forks_count: "forks",
  issues_count: "issues",
  pulls_count: "pull_requests",
  latest_commit: "last_commit",
  newest_release: "last_release",
  latest_tag: "last_release",
  // legacy
  watchers_count: "watchers",
  open_issues_count: "issues",
  open_pull_requests_count: "pull_requests",
  forks: "forks",
  watchers: "watchers",
  issues: "issues",
  pull_requests: "pull_requests",
  open_pull_requests: "pull_requests",
  stars: "stars"
}, Fe = {
  forks: "forks_count",
  watchers: "watchers_count",
  issues: "open_issues_count",
  open_issues: "open_issues_count",
  pull_requests: "open_pull_requests_count",
  open_pull_requests: "open_pull_requests_count",
  stars: "stargazers_count",
  stargazers: "stargazers_count"
}, Ie = [
  "stargazers_count",
  "forks_count",
  "watchers_count",
  "open_issues_count",
  "open_pull_requests_count",
  "newest_release",
  "latest_release",
  "latest_tag",
  "latest_commit",
  "last_commit"
];
function Be(i) {
  const e = i.toLowerCase();
  for (const t of Ie)
    if (e.endsWith(`_${t}`))
      return i.slice(0, i.length - t.length - 1) + "_";
  return null;
}
const D = {
  // Translation keys as used by the HA GitHub integration
  stargazers_count: "stargazers_count",
  subscribers_count: "watchers_count",
  // GitHub "watchers" = API "subscribers"
  forks_count: "forks_count",
  issues_count: "open_issues_count",
  pulls_count: "open_pull_requests_count",
  // Legacy / alternative names
  open_issues_count: "open_issues_count",
  open_pull_requests_count: "open_pull_requests_count",
  watchers_count: "watchers_count"
};
function Ke(i, e) {
  if (i.entities) {
    const s = i.entities[e];
    if (s?.translation_key) return s.translation_key;
    const r = (s?.unique_id ?? "").toLowerCase();
    for (const o of Object.keys(D))
      if (r.endsWith(`_${o}`) || r === o) return o;
  }
  const t = e.toLowerCase();
  for (const s of Object.keys(D))
    if (t.endsWith(`_${s}`)) return s;
  for (const [s, r] of Object.entries(Fe))
    if (t.endsWith(`_${s}`)) return r;
  return null;
}
function ge(i, e) {
  if (!i.states[e]) {
    if (console.warn(`[ha-github-card] resolveGithubDevice — entity '${e}' not found in hass.states`), console.debug("[ha-github-card] resolveGithubDevice — available states count:", Object.keys(i.states).length), console.debug("[ha-github-card] resolveGithubDevice — hass.entities entry:", i.entities?.[e]), e.includes("/")) {
      const [l, u] = e.split("/", 2), a = (v) => v.toLowerCase().replace(/[^a-z0-9]/g, "_"), f = a(l), _ = a(u), g = Object.keys(i.states).filter((v) => {
        const C = v.toLowerCase();
        return C.includes(f) && C.includes(_);
      });
      if (console.debug(`[ha-github-card] resolveGithubDevice — fuzzy match for '${e}':`, g), g.length > 0)
        return console.info(`[ha-github-card] resolveGithubDevice — remapped '${e}' → '${g[0]}'`), ge(i, g[0]);
    }
    return null;
  }
  const t = i.states[e].attributes;
  if (console.debug(`[ha-github-card] resolveGithubDevice — found '${e}' in hass.states, state='${i.states[e].state}', attrs:`, t), t.stargazers_count !== void 0 || t.full_name !== void 0)
    return {
      entity_id: e,
      state: i.states[e].state,
      friendly_name: t.friendly_name ?? e,
      attributes: t,
      slot_icons: {}
    };
  const s = i.entities?.[e], r = s?.device_id ?? null;
  console.debug("[ha-github-card] resolveGithubDevice — new-style path. regEntry:", s, "| deviceId:", r);
  const o = r && i.entities ? Object.values(i.entities).filter((l) => l.device_id === r).map((l) => l.entity_id).filter((l) => l in i.states) : (() => {
    const l = Be(e);
    if (console.debug(`[ha-github-card] resolveGithubDevice — no device registry, using prefix fallback: '${l}'`), l) {
      const u = Object.keys(i.states).filter(
        (a) => a.toLowerCase().startsWith(l.toLowerCase())
      );
      if (u.length > 1) return u;
    }
    return [e];
  })();
  console.debug("[ha-github-card] resolveGithubDevice — sibling entity IDs:", o);
  const n = {}, h = {};
  for (const l of o) {
    const u = i.states[l];
    if (!u) continue;
    const a = u.attributes, f = Ke(i, l);
    if (f && f in D) {
      const _ = D[f], g = parseFloat(u.state), v = isNaN(g) ? void 0 : g;
      console.debug(`[ha-github-card]   ${l} → metricKey='${f}' → attr='${_}' state='${u.state}' value=${v}`), v !== void 0 && (n[_] = v);
      const C = We[f];
      C && a.icon && (h[C] = a.icon);
    } else
      console.debug(`[ha-github-card]   ${l} → metricKey=${f ?? "null"} (no SENSOR_ATTR_MAP match) state='${u.state}' attrs:`, Object.keys(a));
    if ((l.toLowerCase().includes("commit") || f === "latest_commit") && (a.sha && (n.latest_commit_sha = a.sha), a.url && (n.latest_commit_url = a.url), a.authored_at && (n.latest_commit_authored_at = a.authored_at), a.message && (n.latest_commit_message = a.message), !n.latest_commit_sha && u.state && u.state !== "unavailable" && (n.latest_commit_sha = u.state), a.icon && (h.last_commit = a.icon)), (l.toLowerCase().includes("release") || l.toLowerCase().includes("_tag") || f === "latest_tag") && (a.tag && (n.latest_release_tag = a.tag), !n.latest_release_tag && u.state && u.state !== "unavailable" && u.state !== "unknown" && (n.latest_release_tag = u.state)), a.html_url) {
      const _ = a.html_url;
      /\/(commit|releases|tree|blob|pull|issues)\//.test(_) || (n.html_url = _);
    }
    a.full_name && (n.full_name = a.full_name), a.language && (n.language = a.language), a.owner_avatar && (n.owner_avatar = a.owner_avatar), a.owner_login && (n.owner_login = a.owner_login);
  }
  console.debug("[ha-github-card] resolveGithubDevice — combined attrs:", JSON.stringify(n)), console.debug("[ha-github-card] resolveGithubDevice — slot_icons:", h);
  let c = e;
  if (r && i.devices?.[r]) {
    const l = i.devices[r];
    c = l.name_by_user ?? l.name ?? e, !n.html_url && l.configuration_url && (n.html_url = l.configuration_url), !n.full_name && l.name && (n.full_name = l.name);
  } else
    c = (t.friendly_name ?? e).replace(/\s+(Stargazers.*|Forks.*|Watchers.*|Issues.*|Pull Requests.*|Commits?.*|Releases?.*)$/i, "").trim() || e;
  if (n.latest_release_tag && n.html_url) {
    const l = n.html_url.replace(/\/$/, "");
    n.latest_release_url = `${l}/releases/tag/${encodeURIComponent(n.latest_release_tag)}`;
  }
  return {
    entity_id: e,
    state: i.states[e].state,
    friendly_name: c,
    attributes: n,
    slot_icons: h
  };
}
function Je(i) {
  if (!i) return "—";
  try {
    return new Date(i).toLocaleDateString(void 0, {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  } catch {
    return i;
  }
}
function S(i) {
  return i == null ? "—" : i >= 1e6 ? `${(i / 1e6).toFixed(1)}M` : i >= 1e3 ? `${(i / 1e3).toFixed(1)}k` : String(i);
}
var Ze = Object.defineProperty, me = (i, e, t, s) => {
  for (var r = void 0, o = i.length - 1, n; o >= 0; o--)
    (n = i[o]) && (r = n(e, t, r) || r);
  return r && Ze(e, t, r), r;
};
const P = [
  ["watchers", "stars", "last_commit"],
  ["pull_requests", "issues"]
], Xe = {
  stars: "mdi:star",
  forks: "mdi:source-fork",
  watchers: "mdi:eye",
  issues: "mdi:alert-circle-outline",
  pull_requests: "mdi:source-pull",
  last_commit: "mdi:source-commit",
  last_release: "mdi:tag"
}, X = class ve extends x {
  hass;
  _config;
  // ------------------------------------------------------------------
  // Lovelace API
  // ------------------------------------------------------------------
  static getConfigElement() {
    return document.createElement("ha-github-card-editor");
  }
  static getStubConfig() {
    return {
      type: "custom:ha-github-card",
      title: "GitHub",
      entities: [],
      show_avatar: !0,
      show_header: !0,
      show_header_icon: !0,
      compact: !1,
      rows: [["watchers", "stars", "last_commit"], ["pull_requests", "issues"]]
    };
  }
  setConfig(e) {
    if (!e.entities || !Array.isArray(e.entities))
      throw new Error('ha-github-card: "entities" must be an array');
    const t = e.entities.filter((r) => typeof r == "string" && r.trim() !== "");
    let s = e.rows;
    !s?.length && (e.row2_slots || e.row3_slots) && (s = [
      e.row2_slots ?? P[0],
      e.row3_slots ?? P[1]
    ]), this._config = { ...ve.getStubConfig(), ...e, entities: t, rows: s ?? P };
  }
  getCardSize() {
    return (this._config?.entities?.length ?? 1) * 3 + 1;
  }
  // ------------------------------------------------------------------
  // Render
  // ------------------------------------------------------------------
  render() {
    if (!this._config || !this.hass) return p;
    const e = this._config.entities ?? [];
    console.debug("[ha-github-card] card.render — configured entity IDs:", e), console.debug("[ha-github-card] card.render — hass.states keys (sample):", Object.keys(this.hass.states).slice(0, 20));
    const t = e.map((s) => {
      const r = ge(this.hass, s);
      return console.debug(`[ha-github-card] card.render — resolveGithubDevice('${s}') =>`, r), r;
    }).filter((s) => s !== null);
    return console.debug("[ha-github-card] card.render — resolved entities:", t.length, t.map((s) => s.entity_id)), d`
      <ha-card>
        ${this._renderCardHeader()}
        <div class="card-content ${this._config.compact ? "compact" : ""}">
          ${t.length === 0 ? d`<div class="empty">No GitHub entities configured.</div>` : t.map((s) => this._renderEntity(s))}
        </div>
      </ha-card>
    `;
  }
  _renderCardHeader() {
    if (this._config.show_header === !1) return p;
    const e = this._config.title;
    return e ? d`
      <div class="card-header">
        ${this._config.show_header_icon !== !1 ? d`<div class="header-icon"><ha-icon class="icon-header" .icon="${"mdi:github"}"></ha-icon></div>` : p}
        <span class="header-title">${e}</span>
      </div>
    ` : p;
  }
  _getRows() {
    return this._config.rows?.length ? this._config.rows : [
      this._config.row2_slots ?? P[0],
      this._config.row3_slots ?? P[1]
    ];
  }
  _renderEntity(e) {
    const t = e.attributes, s = this._getRows();
    return d`
      <div class="entity-card">

        <!-- Row 1: name (fixed left) + version (fixed right) -->
        <div class="entity-header">
          <div class="header-name">
            ${this._config.show_avatar && t.owner_avatar ? d`<img class="avatar" src="${t.owner_avatar}" alt="${t.owner_login}" />` : p}
            <a
              class="repo-name"
              href="${t.html_url ?? "#"}"
              target="_blank"
              rel="noopener noreferrer"
            >${t.full_name ?? e.entity_id}</a>
          </div>
          <div class="header-version">
            ${t.latest_release_tag ? d`<a
                  class="version-link"
                  href="${t.latest_release_url ?? "#"}"
                  target="_blank"
                  rel="noopener noreferrer"
                >${t.latest_release_tag}</a>` : d`<span class="version-none">no release</span>`}
          </div>
        </div>

        <!-- Configurable rows -->
        ${s.map((r) => r.length > 0 ? d`
            <div
              class="entity-row"
              style="grid-template-columns: repeat(${r.length}, 1fr)"
            >
              ${r.map((o) => d`
                <div class="slot-cell">${this._renderSlot(o, e)}</div>
              `)}
            </div>
          ` : p)}

      </div>
    `;
  }
  _slotIcon(e, t) {
    const s = this._config.icons?.[e], r = t.slot_icons[e], o = s ?? r ?? Xe[e] ?? "mdi:help-circle-outline";
    return d`<ha-icon class="icon-sm" .icon="${o}"></ha-icon>`;
  }
  _renderSlot(e, t) {
    const s = t.attributes;
    switch (e) {
      case "stars":
        return d`
          ${this._slotIcon(e, t)}
          <span class="slot-value">${S(s.stargazers_count)}</span>
          <span class="slot-label">Stars</span>
        `;
      case "forks":
        return d`
          ${this._slotIcon(e, t)}
          <span class="slot-value">${S(s.forks_count)}</span>
          <span class="slot-label">Forks</span>
        `;
      case "watchers":
        return d`
          ${this._slotIcon(e, t)}
          <span class="slot-value">${S(s.watchers_count)}</span>
          <span class="slot-label">Watchers</span>
        `;
      case "issues":
        return d`
          ${this._slotIcon(e, t)}
          <span class="slot-value">${S(s.open_issues_count)}</span>
          <span class="slot-label">Issues</span>
        `;
      case "pull_requests":
        return d`
          ${this._slotIcon(e, t)}
          <span class="slot-value">${S(s.open_pull_requests_count)}</span>
          <span class="slot-label">Pull Requests</span>
        `;
      case "last_commit":
        return s.latest_commit_sha ? d`
              ${this._slotIcon(e, t)}
              <a
                class="slot-mono-link"
                href="${s.latest_commit_url ?? "#"}"
                target="_blank"
                rel="noopener noreferrer"
                title="${s.latest_commit_message}"
              >${s.latest_commit_sha.slice(0, 7)}</a>
              <span class="slot-label">${Je(s.latest_commit_authored_at)}</span>
            ` : d`${this._slotIcon(e, t)}<span class="slot-value">—</span>`;
      case "last_release":
        return d`
          ${this._slotIcon(e, t)}
          ${s.latest_release_tag ? d`<a
                class="slot-link"
                href="${s.latest_release_url ?? "#"}"
                target="_blank"
                rel="noopener noreferrer"
              >${s.latest_release_tag}</a>` : d`<span class="slot-value">—</span>`}
        `;
      default:
        return d``;
    }
  }
  // ------------------------------------------------------------------
  // Styles
  // ------------------------------------------------------------------
  static styles = de`
    :host {
      --gh-accent:    var(--primary-color, #0366d6);
      --gh-text:      var(--primary-text-color, #24292e);
      --gh-text-sec:  var(--secondary-text-color, #586069);
      --gh-border:    var(--divider-color, #e1e4e8);
      --gh-bg-row1:   var(--secondary-background-color, #f6f8fa);
      --gh-link:      var(--primary-color, #0366d6);
    }

    ha-card {
      overflow: hidden;
      border-radius: var(--ha-card-border-radius, 12px);
    }

    /* ---- Card-level header ---- */
    .card-header {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 14px 16px 8px;
      font-size: 1.05rem;
      font-weight: 600;
      color: var(--gh-text);
      border-bottom: 1px solid var(--gh-border);
    }

    .header-icon {
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      flex-shrink: 0;
    }

    .header-title { flex: 1; }

    /* ---- Content wrapper ---- */
    .card-content {
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .card-content.compact { gap: 6px; }

    .empty {
      color: var(--gh-text-sec);
      padding: 16px;
      text-align: center;
      font-style: italic;
    }

    /* ================================================
       Entity card — table-like 3-row layout
       ================================================ */
    .entity-card {
      border: 1px solid var(--gh-border);
      border-radius: 8px;
      overflow: hidden;
    }

    /* ---- Row 1: name | version (fixed) ---- */
    .entity-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 10px 12px;
      background: var(--gh-bg-row1);
    }

    .header-name {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
      flex: 1;
    }

    .avatar {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .repo-name {
      font-weight: 600;
      font-size: 0.9rem;
      color: var(--gh-link);
      text-decoration: none;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .repo-name:hover { text-decoration: underline; }

    .header-version { flex-shrink: 0; }

    .version-link {
      font-size: 0.78rem;
      font-weight: 500;
      color: var(--gh-link);
      text-decoration: none;
      background: color-mix(in srgb, var(--gh-link) 12%, transparent);
      border-radius: 10px;
      padding: 2px 9px;
    }

    .version-link:hover { text-decoration: underline; }

    .version-none {
      font-size: 0.78rem;
      color: var(--gh-text-sec);
      opacity: 0.55;
    }

    /* ---- Rows 2 & 3: configurable grid ---- */
    .entity-row {
      display: grid;   /* columns set inline via style="" */
    }

    /* ---- Slot cell ---- */
    .slot-cell {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 9px 12px;
      font-size: 0.82rem;
      color: var(--gh-text-sec);
      min-width: 0;
      overflow: hidden;
    }

    .compact .slot-cell { padding: 6px 10px; }

    .slot-cell + .slot-cell {
      /* no border between cells */
    }

    .slot-value {
      font-weight: 700;
      color: var(--gh-text);
      flex-shrink: 0;
    }

    .slot-label {
      font-size: 0.72rem;
      color: var(--gh-text-sec);
      opacity: 0.8;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .slot-link {
      font-weight: 600;
      color: var(--gh-link);
      text-decoration: none;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .slot-link:hover { text-decoration: underline; }

    /* Monospace commit hash */
    .slot-mono-link {
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--gh-link);
      text-decoration: none;
      letter-spacing: 0.03em;
      flex-shrink: 0;
    }

    .slot-mono-link:hover { text-decoration: underline; }

    .slot-lang {
      font-weight: 600;
      color: var(--gh-text);
      background: color-mix(in srgb, var(--gh-accent) 14%, transparent);
      border-radius: 10px;
      padding: 1px 8px;
      font-size: 0.76rem;
    }

    /* ---- Icons ---- */
    ha-icon.icon-header {
      --mdc-icon-size: 20px;
      width: 20px;
      height: 20px;
      color: var(--gh-text);
    }

    ha-icon.icon-sm {
      --mdc-icon-size: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 15px;
      height: 15px;
      flex-shrink: 0;
      opacity: 0.7;
      color: var(--state-icon-color, var(--gh-text-sec));
    }
  `;
};
me([
  J({ attribute: !1 })
], X.prototype, "hass");
me([
  Z()
], X.prototype, "_config");
let Qe = X;
var Ye = Object.defineProperty, Q = (i, e, t, s) => {
  for (var r = void 0, o = i.length - 1, n; o >= 0; o--)
    (n = i[o]) && (r = n(e, t, r) || r);
  return r && Ye(e, t, r), r;
};
const et = [
  ["watchers", "👁  Watchers"],
  ["stars", "⭐ Stars"],
  ["forks", "🍴 Forks"],
  ["issues", "🐛 Issues"],
  ["pull_requests", "🔀 Pull Requests"],
  ["last_commit", "🔗 Last Commit"],
  ["last_release", "🏷  Latest Release"],
  ["none", "— None —"]
];
class j extends x {
  hass;
  _config = void 0;
  _pickerValue = "";
  setConfig(e) {
    console.debug("[ha-github-card] editor.setConfig called", e), this._config = { ...e }, this.requestUpdate();
  }
  // ------------------------------------------------------------------
  // Helpers
  // ------------------------------------------------------------------
  _removeEntity(e) {
    this._fireConfigChanged({
      ...this._config,
      entities: (this._config.entities ?? []).filter((t) => t !== e)
    });
  }
  _entityPicked(e) {
    const t = e.detail?.value ?? e.target?.value ?? "";
    if (console.debug("[ha-github-card] editor._entityPicked — value:", t), !t || !t.trim()) {
      this._pickerValue = "";
      return;
    }
    const s = this._config.entities ?? [];
    s.includes(t) || this._fireConfigChanged({ ...this._config, entities: [...s, t] }), this._pickerValue = "";
  }
  _addCurrentEntity() {
    const e = this._pickerValue.trim();
    if (console.debug("[ha-github-card] editor._addCurrentEntity —", e), !e) return;
    const t = this._config.entities ?? [];
    t.includes(e) || this._fireConfigChanged({ ...this._config, entities: [...t, e] }), this._pickerValue = "";
  }
  _setValue(e, t) {
    this._fireConfigChanged({ ...this._config, [e]: t });
  }
  _setSlotIcon(e, t) {
    const s = { ...this._config.icons ?? {} };
    t.trim() ? s[e] = t.trim() : delete s[e], this._fireConfigChanged({ ...this._config, icons: s });
  }
  _getRows() {
    if (this._config.rows?.length) return this._config.rows.map((s) => [...s]);
    const e = this._config.row2_slots ?? ["watchers", "stars", "last_commit"], t = this._config.row3_slots ?? ["pull_requests", "issues"];
    return [[...e], [...t]];
  }
  _setRowSlot(e, t, s) {
    const r = this._getRows();
    r[e][t] = s, this._fireConfigChanged({ ...this._config, rows: r });
  }
  _setRowColCount(e, t) {
    const s = this._getRows(), r = s[e];
    for (; r.length < t; ) r.push("none");
    s[e] = r.slice(0, t), this._fireConfigChanged({ ...this._config, rows: s });
  }
  _addRow() {
    const e = this._getRows();
    e.length >= 5 || this._fireConfigChanged({ ...this._config, rows: [...e, ["none"]] });
  }
  _removeRow(e) {
    const t = this._getRows();
    this._fireConfigChanged({ ...this._config, rows: t.filter((s, r) => r !== e) });
  }
  _fireConfigChanged(e) {
    this._config = e, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: e },
        bubbles: !0,
        composed: !0
      })
    );
  }
  // ------------------------------------------------------------------
  // Render
  // ------------------------------------------------------------------
  render() {
    if (console.debug("[ha-github-card] editor.render — hass:", !!this.hass, "| _config:", this._config), !this._config)
      return console.warn("[ha-github-card] editor.render — _config is not set yet, rendering nothing"), p;
    const e = this._config, t = e.entities ?? [], s = this._getRows(), r = this.hass ? Ve(this.hass) : [];
    return console.debug("[ha-github-card] editor.render — githubEntities found:", r.length, r), console.debug("[ha-github-card] editor — ha-textfield defined:", !!customElements.get("ha-textfield"), "| ha-entity-picker defined:", !!customElements.get("ha-entity-picker")), d`
      <div class="field-group">
        <label class="field-label" for="card-title">Card Title</label>
        <input
          id="card-title"
          type="text"
          class="text-input"
          .value="${e.title ?? ""}"
          @change="${(o) => this._setValue("title", o.target.value)}"
          placeholder="GitHub"
        />
      </div>

      <div class="section-label">GitHub Entities</div>

      ${t.length > 0 ? d`
            <div class="entity-list">
              ${t.map((o) => {
      const n = !!(this.hass && this.hass.states[o]);
      return d`
                  <div class="entity-row ${n ? "" : "entity-warn"}">
                    <span class="entity-id">${o}</span>
                    ${n ? p : d`<span class="warn-icon" title="Entity not found in HA — check ID">⚠</span>`}
                    <button
                      class="remove-btn"
                      @click="${() => this._removeEntity(o)}"
                      aria-label="Remove"
                    >✕</button>
                  </div>
                `;
    })}
            </div>
          ` : d`<p class="hint">No entities added yet.</p>`}

      <datalist id="github-entity-list">
        ${r.map((o) => d`<option value="${o}"></option>`)}
      </datalist>
      <div class="add-entity-row">
        <input
          type="text"
          class="text-input entity-input"
          list="github-entity-list"
          placeholder="sensor.myrepo_watchers_count"
          .value="${this._pickerValue}"
          @input="${(o) => {
      this._pickerValue = o.target.value;
    }}"
          @change="${this._entityPicked}"
        />
        <button class="add-btn" @click="${this._addCurrentEntity}">Add</button>
      </div>
      <p class="hint">
        ${r.length > 0 ? d`${r.length} GitHub entities available — pick from list or type any entity ID.` : d`No GitHub entities auto-detected. Type the entity ID manually (e.g. <em>sensor.owner_repo_watchers_count</em>).`}
      </p>

      <div class="section-label">Rows — ${s.length} / 5</div>

      ${s.map((o, n) => d`
        <div class="row-block">
          <div class="row-block-header">
            <span class="row-block-title">Row ${n + 1}</span>
            <div class="col-count-btns">
              <span class="col-count-label">Cols:</span>
              ${[1, 2, 3].map((h) => d`
                <button
                  class="col-count-btn ${o.length === h ? "active" : ""}"
                  @click="${() => this._setRowColCount(n, h)}"
                >${h}</button>
              `)}
            </div>
            <button
              class="remove-btn row-remove-btn"
              @click="${() => this._removeRow(n)}"
              aria-label="Remove row"
              ?disabled="${s.length <= 1}"
            >✕</button>
          </div>
          <div class="slot-row">
            ${o.map((h, c) => this._renderSlotSelect(n, c, h, `Col ${c + 1}`))}
          </div>
        </div>
      `)}

      ${s.length < 5 ? d`
        <button class="add-row-btn" @click="${() => this._addRow()}">+ Add Row</button>
      ` : p}

      <div class="section-label">Visual Options</div>
      <label class="toggle-row">
        <input
          type="checkbox"
          .checked="${e.show_header !== !1}"
          @change="${(o) => this._setValue("show_header", o.target.checked)}"
        />
        Show Card Header (title bar)
      </label>
      <label class="toggle-row">
        <input
          type="checkbox"
          .checked="${e.show_header_icon !== !1}"
          @change="${(o) => this._setValue("show_header_icon", o.target.checked)}"
        />
        Show GitHub Icon in Header
      </label>
      <label class="toggle-row">
        <input
          type="checkbox"
          .checked="${e.show_avatar !== !1}"
          @change="${(o) => this._setValue("show_avatar", o.target.checked)}"
        />
        Show Owner Avatar
      </label>
      <label class="toggle-row">
        <input
          type="checkbox"
          .checked="${!!e.compact}"
          @change="${(o) => this._setValue("compact", o.target.checked)}"
        />
        Compact Layout
      </label>
    `;
  }
  _renderSlotSelect(e, t, s, r) {
    const o = this._config.icons?.[s] ?? "";
    return d`
      <div class="slot-select-wrap">
        <span class="slot-col-label">${r}</span>
        <select
          @change="${(n) => this._setRowSlot(e, t, n.target.value)}"
        >
          ${et.map(
      ([n, h]) => d`
              <option value="${n}" ?selected="${n === s}">${h}</option>
            `
    )}
        </select>
        ${s !== "none" ? d`
          <div class="icon-override-row">
            ${o ? d`<ha-icon class="icon-preview" .icon="${o}"></ha-icon>` : d`<span class="icon-preview-placeholder">&#xFFFD;</span>`}
            <input
              type="text"
              class="text-input icon-input"
              placeholder="mdi:star"
              .value="${o}"
              title="Override icon (leave empty to use sensor default)"
              @change="${(n) => this._setSlotIcon(s, n.target.value)}"
            />
          </div>
        ` : p}
      </div>
    `;
  }
  // ------------------------------------------------------------------
  // Styles
  // ------------------------------------------------------------------
  static styles = de`
    :host {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 8px 0;
    }
    .section-label {
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--primary-text-color);
      border-bottom: 1px solid var(--divider-color, #e1e4e8);
      padding-bottom: 4px;
      margin-top: 4px;
    }
    .hint {
      font-size: 0.78rem;
      color: var(--secondary-text-color);
      margin: 0;
      line-height: 1.5;
    }
    .field-group { display: flex; flex-direction: column; gap: 4px; }
    .field-label {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .text-input {
      width: 100%;
      box-sizing: border-box;
      padding: 8px 10px;
      border: 1px solid var(--divider-color, #e1e4e8);
      border-radius: 6px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      font-size: 0.9rem;
      font-family: inherit;
    }
    .text-input:focus {
      outline: none;
      border-color: var(--primary-color, #0366d6);
      box-shadow: 0 0 0 2px color-mix(in srgb, var(--primary-color, #0366d6) 20%, transparent);
    }
    .entity-list { display: flex; flex-direction: column; gap: 4px; }
    .entity-row {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 8px 6px 12px;
      border: 1px solid var(--primary-color, #0366d6);
      border-radius: 6px;
      background: color-mix(in srgb, var(--primary-color, #0366d6) 6%, transparent);
    }
    .entity-row.entity-warn {
      border-color: var(--warning-color, #f59e0b);
      background: color-mix(in srgb, var(--warning-color, #f59e0b) 8%, transparent);
    }
    .entity-id { flex: 1; font-size: 0.85rem; color: var(--primary-text-color); word-break: break-all; }
    .warn-icon { color: var(--warning-color, #f59e0b); font-size: 1rem; cursor: help; flex-shrink: 0; }
    .remove-btn {
      flex-shrink: 0;
      background: none;
      border: none;
      color: var(--secondary-text-color);
      cursor: pointer;
      font-size: 0.9rem;
      padding: 2px 6px;
      border-radius: 4px;
      line-height: 1;
    }
    .remove-btn:hover { background: color-mix(in srgb, var(--error-color, #f44336) 12%, transparent); color: var(--error-color, #f44336); }
    .add-entity-row { display: flex; gap: 8px; align-items: center; }
    .entity-input { flex: 1; margin-bottom: 0; }
    .add-btn {
      flex-shrink: 0;
      padding: 8px 16px;
      background: var(--primary-color, #0366d6);
      color: var(--text-primary-color, #fff);
      border: none;
      border-radius: 6px;
      font-size: 0.88rem;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
      font-family: inherit;
    }
    .add-btn:hover { opacity: 0.88; }
    .slot-row { display: flex; gap: 8px; }
    .slot-select-wrap { flex: 1; display: flex; flex-direction: column; gap: 4px; min-width: 0; }
    .slot-col-label {
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    select {
      width: 100%;
      padding: 6px 8px;
      border: 1px solid var(--divider-color, #e1e4e8);
      border-radius: 6px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      font-size: 0.85rem;
      cursor: pointer;
      font-family: inherit;
    }
    select:focus { outline: none; border-color: var(--primary-color, #0366d6); }
    .icon-override-row {
      display: flex;
      align-items: center;
      gap: 5px;
      margin-top: 4px;
    }
    ha-icon.icon-preview {
      --mdc-icon-size: 16px;
      width: 16px;
      height: 16px;
      flex-shrink: 0;
      color: var(--secondary-text-color);
    }
    .icon-preview-placeholder {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      color: var(--secondary-text-color);
      opacity: 0.4;
    }
    .icon-input { font-size: 0.75rem; padding: 4px 6px; }
    .toggle-row {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.9rem;
      color: var(--primary-text-color);
      cursor: pointer;
    }
    .toggle-row input[type="checkbox"] {
      width: 16px;
      height: 16px;
      cursor: pointer;
      accent-color: var(--primary-color, #0366d6);
    }
    .row-block {
      border: 1px solid var(--divider-color, #e1e4e8);
      border-radius: 8px;
      padding: 10px 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      background: color-mix(in srgb, var(--primary-text-color, #000) 2%, transparent);
    }
    .row-block-header {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .row-block-title {
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      flex: 1;
    }
    .col-count-btns {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .col-count-label {
      font-size: 0.75rem;
      color: var(--secondary-text-color);
      margin-right: 2px;
    }
    .col-count-btn {
      width: 28px;
      height: 28px;
      border: 1px solid var(--divider-color, #e1e4e8);
      border-radius: 4px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      font-family: inherit;
      padding: 0;
    }
    .col-count-btn:hover { background: color-mix(in srgb, var(--primary-color, #0366d6) 10%, transparent); }
    .col-count-btn.active {
      background: var(--primary-color, #0366d6);
      color: var(--text-primary-color, #fff);
      border-color: var(--primary-color, #0366d6);
    }
    .row-remove-btn { padding: 2px 6px; }
    .row-remove-btn:disabled { opacity: 0.35; cursor: not-allowed; }
    .add-row-btn {
      align-self: flex-start;
      padding: 7px 14px;
      border: 1px dashed var(--primary-color, #0366d6);
      border-radius: 6px;
      background: color-mix(in srgb, var(--primary-color, #0366d6) 6%, transparent);
      color: var(--primary-color, #0366d6);
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      font-family: inherit;
    }
    .add-row-btn:hover { background: color-mix(in srgb, var(--primary-color, #0366d6) 14%, transparent); }
  `;
}
Q([
  J({ attribute: !1 })
], j.prototype, "hass");
Q([
  Z()
], j.prototype, "_config");
Q([
  Z()
], j.prototype, "_pickerValue");
customElements.get("ha-github-card") || customElements.define("ha-github-card", Qe);
customElements.get("ha-github-card-editor") || customElements.define("ha-github-card-editor", j);
window.customCards ??= [];
const tt = window.customCards;
tt.push({
  type: "ha-github-card",
  name: "GitHub Card",
  description: "Display information from your GitHub repositories tracked via the GitHub integration.",
  preview: !0,
  documentationURL: "https://github.com/your-username/ha-github-card"
});
export {
  Qe as GithubCard,
  j as GithubCardEditor
};
//# sourceMappingURL=ha-github-card.js.map
