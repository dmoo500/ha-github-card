const F = globalThis, tt = F.ShadowRoot && (F.ShadyCSS === void 0 || F.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, et = /* @__PURE__ */ Symbol(), ut = /* @__PURE__ */ new WeakMap();
let kt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== et) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (tt && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = ut.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && ut.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Bt = (o) => new kt(typeof o == "string" ? o : o + "", void 0, et), C = (o, ...t) => {
  const e = o.length === 1 ? o[0] : t.reduce((s, i, r) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + o[r + 1], o[0]);
  return new kt(e, o, et);
}, Kt = (o, t) => {
  if (tt) o.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = F.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, o.appendChild(s);
  }
}, pt = tt ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return Bt(e);
})(o) : o;
const { is: Wt, defineProperty: Yt, getOwnPropertyDescriptor: Xt, getOwnPropertyNames: Zt, getOwnPropertySymbols: Jt, getPrototypeOf: Qt } = Object, Y = globalThis, _t = Y.trustedTypes, te = _t ? _t.emptyScript : "", ee = Y.reactiveElementPolyfillSupport, D = (o, t) => o, B = { toAttribute(o, t) {
  switch (t) {
    case Boolean:
      o = o ? te : null;
      break;
    case Object:
    case Array:
      o = o == null ? o : JSON.stringify(o);
  }
  return o;
}, fromAttribute(o, t) {
  let e = o;
  switch (t) {
    case Boolean:
      e = o !== null;
      break;
    case Number:
      e = o === null ? null : Number(o);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(o);
      } catch {
        e = null;
      }
  }
  return e;
} }, st = (o, t) => !Wt(o, t), ft = { attribute: !0, type: String, converter: B, reflect: !1, useDefault: !1, hasChanged: st };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), Y.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let E = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ft) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && Yt(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: r } = Xt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: i, set(n) {
      const a = i?.call(this);
      r?.call(this, n), this.requestUpdate(t, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ft;
  }
  static _$Ei() {
    if (this.hasOwnProperty(D("elementProperties"))) return;
    const t = Qt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(D("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(D("properties"))) {
      const e = this.properties, s = [...Zt(e), ...Jt(e)];
      for (const i of s) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, i] of e) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const i = this._$Eu(e, s);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const i of s) e.unshift(pt(i));
    } else t !== void 0 && e.push(pt(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Kt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const r = (s.converter?.toAttribute !== void 0 ? s.converter : B).toAttribute(e, s.type);
      this._$Em = t, r == null ? this.removeAttribute(i) : this.setAttribute(i, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const r = s.getPropertyOptions(i), n = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : B;
      this._$Em = i;
      const a = n.fromAttribute(e, r.type);
      this[i] = a ?? this._$Ej?.get(i) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, r) {
    if (t !== void 0) {
      const n = this.constructor;
      if (i === !1 && (r = this[t]), s ??= n.getPropertyOptions(t), !((s.hasChanged ?? st)(r, e) || s.useDefault && s.reflect && r === this._$Ej?.get(t) && !this.hasAttribute(n._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: r }, n) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), r !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [i, r] of this._$Ep) this[i] = r;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [i, r] of s) {
        const { wrapped: n } = r, a = this[i];
        n !== !0 || this._$AL.has(i) || a === void 0 || this.C(i, void 0, r, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
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
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
E.elementStyles = [], E.shadowRootOptions = { mode: "open" }, E[D("elementProperties")] = /* @__PURE__ */ new Map(), E[D("finalized")] = /* @__PURE__ */ new Map(), ee?.({ ReactiveElement: E }), (Y.reactiveElementVersions ??= []).push("2.1.2");
const it = globalThis, gt = (o) => o, K = it.trustedTypes, vt = K ? K.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, St = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, Et = "?" + $, se = `<${Et}>`, A = document, U = () => A.createComment(""), q = (o) => o === null || typeof o != "object" && typeof o != "function", rt = Array.isArray, ie = (o) => rt(o) || typeof o?.[Symbol.iterator] == "function", J = `[ 	
\f\r]`, N = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, mt = /-->/g, yt = />/g, x = RegExp(`>|${J}(?:([^\\s"'>=/]+)(${J}*=${J}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), bt = /'/g, $t = /"/g, Rt = /^(?:script|style|textarea|title)$/i, Tt = (o) => (t, ...e) => ({ _$litType$: o, strings: t, values: e }), d = Tt(1), xt = Tt(2), R = /* @__PURE__ */ Symbol.for("lit-noChange"), _ = /* @__PURE__ */ Symbol.for("lit-nothing"), wt = /* @__PURE__ */ new WeakMap(), w = A.createTreeWalker(A, 129);
function Ot(o, t) {
  if (!rt(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return vt !== void 0 ? vt.createHTML(t) : t;
}
const re = (o, t) => {
  const e = o.length - 1, s = [];
  let i, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = N;
  for (let a = 0; a < e; a++) {
    const l = o[a];
    let p, c, h = -1, u = 0;
    for (; u < l.length && (n.lastIndex = u, c = n.exec(l), c !== null); ) u = n.lastIndex, n === N ? c[1] === "!--" ? n = mt : c[1] !== void 0 ? n = yt : c[2] !== void 0 ? (Rt.test(c[2]) && (i = RegExp("</" + c[2], "g")), n = x) : c[3] !== void 0 && (n = x) : n === x ? c[0] === ">" ? (n = i ?? N, h = -1) : c[1] === void 0 ? h = -2 : (h = n.lastIndex - c[2].length, p = c[1], n = c[3] === void 0 ? x : c[3] === '"' ? $t : bt) : n === $t || n === bt ? n = x : n === mt || n === yt ? n = N : (n = x, i = void 0);
    const g = n === x && o[a + 1].startsWith("/>") ? " " : "";
    r += n === N ? l + se : h >= 0 ? (s.push(p), l.slice(0, h) + St + l.slice(h) + $ + g) : l + $ + (h === -2 ? a : g);
  }
  return [Ot(o, r + (o[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class I {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let r = 0, n = 0;
    const a = t.length - 1, l = this.parts, [p, c] = re(t, e);
    if (this.el = I.createElement(p, s), w.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = w.nextNode()) !== null && l.length < a; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(St)) {
          const u = c[n++], g = i.getAttribute(h).split($), v = /([.?@])?(.*)/.exec(u);
          l.push({ type: 1, index: r, name: v[2], strings: g, ctor: v[1] === "." ? ne : v[1] === "?" ? ae : v[1] === "@" ? le : X }), i.removeAttribute(h);
        } else h.startsWith($) && (l.push({ type: 6, index: r }), i.removeAttribute(h));
        if (Rt.test(i.tagName)) {
          const h = i.textContent.split($), u = h.length - 1;
          if (u > 0) {
            i.textContent = K ? K.emptyScript : "";
            for (let g = 0; g < u; g++) i.append(h[g], U()), w.nextNode(), l.push({ type: 2, index: ++r });
            i.append(h[u], U());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Et) l.push({ type: 2, index: r });
      else {
        let h = -1;
        for (; (h = i.data.indexOf($, h + 1)) !== -1; ) l.push({ type: 7, index: r }), h += $.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const s = A.createElement("template");
    return s.innerHTML = t, s;
  }
}
function T(o, t, e = o, s) {
  if (t === R) return t;
  let i = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const r = q(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== r && (i?._$AO?.(!1), r === void 0 ? i = void 0 : (i = new r(o), i._$AT(o, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = i : e._$Cl = i), i !== void 0 && (t = T(o, i._$AS(o, t.values), i, s)), t;
}
class oe {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: s } = this._$AD, i = (t?.creationScope ?? A).importNode(e, !0);
    w.currentNode = i;
    let r = w.nextNode(), n = 0, a = 0, l = s[0];
    for (; l !== void 0; ) {
      if (n === l.index) {
        let p;
        l.type === 2 ? p = new j(r, r.nextSibling, this, t) : l.type === 1 ? p = new l.ctor(r, l.name, l.strings, this, t) : l.type === 6 && (p = new ce(r, this, t)), this._$AV.push(p), l = s[++a];
      }
      n !== l?.index && (r = w.nextNode(), n++);
    }
    return w.currentNode = A, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class j {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = _, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = i?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = T(this, t, e), q(t) ? t === _ || t == null || t === "" ? (this._$AH !== _ && this._$AR(), this._$AH = _) : t !== this._$AH && t !== R && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ie(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== _ && q(this._$AH) ? this._$AA.nextSibling.data = t : this.T(A.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = I.createElement(Ot(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === i) this._$AH.p(e);
    else {
      const r = new oe(i, this), n = r.u(this.options);
      r.p(e), this.T(n), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = wt.get(t.strings);
    return e === void 0 && wt.set(t.strings, e = new I(t)), e;
  }
  k(t) {
    rt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const r of t) i === e.length ? e.push(s = new j(this.O(U()), this.O(U()), this, this.options)) : s = e[i], s._$AI(r), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = gt(t).nextSibling;
      gt(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class X {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, r) {
    this.type = 1, this._$AH = _, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = _;
  }
  _$AI(t, e = this, s, i) {
    const r = this.strings;
    let n = !1;
    if (r === void 0) t = T(this, t, e, 0), n = !q(t) || t !== this._$AH && t !== R, n && (this._$AH = t);
    else {
      const a = t;
      let l, p;
      for (t = r[0], l = 0; l < r.length - 1; l++) p = T(this, a[s + l], e, l), p === R && (p = this._$AH[l]), n ||= !q(p) || p !== this._$AH[l], p === _ ? t = _ : t !== _ && (t += (p ?? "") + r[l + 1]), this._$AH[l] = p;
    }
    n && !i && this.j(t);
  }
  j(t) {
    t === _ ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ne extends X {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === _ ? void 0 : t;
  }
}
class ae extends X {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== _);
  }
}
class le extends X {
  constructor(t, e, s, i, r) {
    super(t, e, s, i, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = T(this, t, e, 0) ?? _) === R) return;
    const s = this._$AH, i = t === _ && s !== _ || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, r = t !== _ && (s === _ || i);
    i && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ce {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    T(this, t);
  }
}
const de = it.litHtmlPolyfillSupport;
de?.(I, j), (it.litHtmlVersions ??= []).push("3.3.2");
const he = (o, t, e) => {
  const s = e?.renderBefore ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const r = e?.renderBefore ?? null;
    s._$litPart$ = i = new j(t.insertBefore(U(), r), r, void 0, e ?? {});
  }
  return i._$AI(o), i;
};
const ot = globalThis;
class b extends E {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = he(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return R;
  }
}
b._$litElement$ = !0, b.finalized = !0, ot.litElementHydrateSupport?.({ LitElement: b });
const ue = ot.litElementPolyfillSupport;
ue?.({ LitElement: b });
(ot.litElementVersions ??= []).push("4.2.2");
const pe = { attribute: !0, type: String, converter: B, reflect: !1, hasChanged: st }, _e = (o = pe, t, e) => {
  const { kind: s, metadata: i } = e;
  let r = globalThis.litPropertyMetadata.get(i);
  if (r === void 0 && globalThis.litPropertyMetadata.set(i, r = /* @__PURE__ */ new Map()), s === "setter" && ((o = Object.create(o)).wrapped = !0), r.set(e.name, o), s === "accessor") {
    const { name: n } = e;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(n, l, o, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(n, void 0, o, a), a;
    } };
  }
  if (s === "setter") {
    const { name: n } = e;
    return function(a) {
      const l = this[n];
      t.call(this, a), this.requestUpdate(n, l, o, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function P(o) {
  return (t, e) => typeof e == "object" ? _e(o, t, e) : ((s, i, r) => {
    const n = i.hasOwnProperty(r);
    return i.constructor.createProperty(r, s), n ? Object.getOwnPropertyDescriptor(i, r) : void 0;
  })(o, t, e);
}
function k(o) {
  return P({ ...o, state: !0, attribute: !1 });
}
const m = {
  commits: {
    label: "Commits",
    icon: "mdi:source-commit",
    color: "var(--gh-activity-commits-color, #2da44e)",
    translationKey: "latest_commit",
    identityAttribute: "sha",
    identityMode: "distinct"
  },
  pull_requests: {
    label: "Pull Requests",
    icon: "mdi:source-pull",
    color: "var(--gh-activity-pull-requests-color, #8250df)",
    translationKey: "latest_pull_request",
    identityAttribute: "number",
    identityMode: "increasing"
  },
  issues: {
    label: "Issues",
    icon: "mdi:alert-circle-outline",
    color: "var(--gh-activity-issues-color, #d4a72c)",
    translationKey: "latest_issue",
    identityAttribute: "number",
    identityMode: "increasing"
  },
  discussions: {
    label: "Discussions",
    icon: "mdi:forum-outline",
    color: "var(--gh-activity-discussions-color, #0969da)",
    translationKey: "latest_discussion",
    identityAttribute: "number",
    identityMode: "increasing"
  }
}, O = Object.keys(
  m
), Pt = [
  "commits",
  "pull_requests",
  "issues"
], V = {
  "7d": { label: "Last 7 days", days: 7 }
}, fe = Object.keys(
  V
), zt = "7d", nt = {
  line: { label: "Line" },
  bar: { label: "Stacked bars" }
}, ge = Object.keys(
  nt
), ve = "line";
function Mt(o) {
  const t = o.activity_range && o.activity_range in V ? o.activity_range : zt, e = O.filter(
    (i) => o.activity_metrics?.includes(i)
  ), s = o.activity_chart_type && o.activity_chart_type in nt ? o.activity_chart_type : ve;
  return {
    range: t,
    metrics: e.length > 0 ? e : [...Pt],
    chartType: s
  };
}
function me(o, t) {
  const e = t.toLowerCase();
  for (const s of O) {
    const i = m[s];
    if (o === i.translationKey) return s;
  }
  for (const s of O)
    if (e.endsWith(`_${m[s].translationKey}`)) return s;
  return null;
}
function ye(o) {
  return new Date(o.getFullYear(), o.getMonth(), o.getDate());
}
function be(o, t) {
  return new Date(o.getFullYear(), o.getMonth(), o.getDate() + t);
}
function Q(o) {
  const t = String(o.getMonth() + 1).padStart(2, "0"), e = String(o.getDate()).padStart(2, "0");
  return `${o.getFullYear()}-${t}-${e}`;
}
function Nt(o, t) {
  const { days: e } = V[o], s = ye(t);
  return Array.from({ length: e }, (i, r) => be(s, r - (e - 1)));
}
const $e = /* @__PURE__ */ new Set(["unavailable", "unknown", ""]);
function xe(o, t) {
  const e = [...o].sort((a, l) => a.lu - l.lu), s = /* @__PURE__ */ new Set();
  let i = -1 / 0, r = !1;
  const n = [];
  for (const a of e) {
    if ($e.has(a.s)) continue;
    const l = a.a?.[t.identityAttribute], p = l != null ? String(l) : a.s, c = l != null ? Number(l) : NaN, u = t.identityMode === "increasing" && Number.isFinite(c) ? c > i : !s.has(p);
    r && u && n.push(a.lu * 1e3), r = !0, s.add(p), Number.isFinite(c) && (i = Math.max(i, c));
  }
  return n;
}
function we(o, t, e) {
  const s = { ...o };
  for (const i of e) {
    const r = t[i];
    if (!r) continue;
    const n = s[i] ?? [], a = Date.parse(r.last_updated) / 1e3, l = n.reduce((p, c) => Math.max(p, c.lu), -1 / 0);
    Number.isFinite(a) && a > l && (s[i] = [...n, { s: r.state, a: r.attributes, lu: a }]);
  }
  return s;
}
function Ae(o, t, e, s, i) {
  const r = Nt(s, i).map((a) => ({
    date: a,
    counts: Object.fromEntries(
      O.map((l) => [l, 0])
    ),
    total: 0
  })), n = new Map(r.map((a, l) => [Q(a.date), l]));
  for (const a of e) {
    const l = t[a];
    if (!l) continue;
    const p = xe(
      o[l] ?? [],
      m[a]
    );
    for (const c of p) {
      const h = n.get(Q(new Date(c)));
      h !== void 0 && (r[h].counts[a] += 1, r[h].total += 1);
    }
  }
  return r;
}
const Ce = 50, S = /* @__PURE__ */ new Map();
function Lt(o, t, e, s) {
  const i = [...t].sort().map((r) => `${r}@${o.states[r]?.last_updated ?? ""}`);
  return [e, Q(s), ...i].join("|");
}
function ke(o, t, e, s) {
  const i = Lt(o, t, e, s), r = S.get(i);
  if (r) return r;
  const [n] = Nt(e, s), a = o.callWS({
    type: "history/history_during_period",
    start_time: n.toISOString(),
    entity_ids: t,
    include_start_time_state: !0,
    // Attribute-only changes (e.g. same commit message, new SHA) must be kept
    significant_changes_only: !1,
    minimal_response: !1,
    no_attributes: !1
  }).catch((l) => {
    throw S.delete(i), l;
  });
  for (S.set(i, a); S.size > Ce; )
    S.delete(S.keys().next().value);
  return a;
}
function at(o) {
  if (o.entities) {
    const t = Object.values(o.entities).filter((e) => e.platform === "github").map((e) => e.entity_id).filter((e) => e in o.states);
    if (t.length > 0) return t;
  }
  return Object.keys(o.states).filter(
    (t) => t.startsWith("github.")
  );
}
const Se = {
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
}, Ee = {
  forks: "forks_count",
  watchers: "watchers_count",
  issues: "open_issues_count",
  open_issues: "open_issues_count",
  pull_requests: "open_pull_requests_count",
  open_pull_requests: "open_pull_requests_count",
  stars: "stargazers_count",
  stargazers: "stargazers_count"
}, Re = [
  "stargazers_count",
  "forks_count",
  "watchers_count",
  "open_issues_count",
  "open_pull_requests_count",
  "newest_release",
  "latest_release",
  "latest_tag",
  "latest_commit",
  "last_commit",
  "latest_issue",
  "latest_pull_request",
  "latest_discussion"
];
function Te(o) {
  const t = o.toLowerCase();
  for (const e of Re)
    if (t.endsWith(`_${e}`))
      return o.slice(0, o.length - e.length - 1) + "_";
  return null;
}
const W = {
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
function Oe(o, t) {
  if (o.entities) {
    const s = o.entities[t];
    if (s?.translation_key) return s.translation_key;
    const i = (s?.unique_id ?? "").toLowerCase();
    for (const r of Object.keys(W))
      if (i.endsWith(`_${r}`) || i === r) return r;
  }
  const e = t.toLowerCase();
  for (const s of Object.keys(W))
    if (e.endsWith(`_${s}`)) return s;
  for (const [s, i] of Object.entries(Ee))
    if (e.endsWith(`_${s}`)) return i;
  return null;
}
function lt(o, t) {
  if (!o.states[t]) {
    if (console.warn(
      `[ha-github-card] resolveGithubDevice — entity '${t}' not found in hass.states`
    ), t.includes("/")) {
      const [c, h] = t.split("/", 2), u = (y) => y.toLowerCase().replace(/[^a-z0-9]/g, "_"), g = u(c), v = u(h), f = Object.keys(o.states).filter((y) => {
        const M = y.toLowerCase();
        return M.includes(g) && M.includes(v);
      });
      if (f.length > 0)
        return console.info(
          `[ha-github-card] resolveGithubDevice — remapped '${t}' → '${f[0]}'`
        ), lt(o, f[0]);
    }
    return null;
  }
  const e = o.states[t].attributes;
  if (e.stargazers_count !== void 0 || e.full_name !== void 0)
    return {
      entity_id: t,
      state: o.states[t].state,
      friendly_name: e.friendly_name ?? t,
      attributes: e,
      slot_icons: {},
      activity_sources: {}
    };
  const i = o.entities?.[t]?.device_id ?? null, r = i && o.entities ? Object.values(o.entities).filter((c) => c.device_id === i).map((c) => c.entity_id).filter((c) => c in o.states) : (() => {
    const c = Te(t);
    if (c) {
      const h = Object.keys(o.states).filter(
        (u) => u.toLowerCase().startsWith(c.toLowerCase())
      );
      if (h.length > 1) return h;
    }
    return [t];
  })(), n = {}, a = {}, l = {};
  for (const c of r) {
    const h = o.states[c];
    if (!h) continue;
    const u = h.attributes, g = me(
      o.entities?.[c]?.translation_key,
      c
    );
    g && (l[g] = c);
    const v = Oe(o, c);
    if (v && v in W) {
      const f = W[v], y = parseFloat(h.state), M = isNaN(y) ? void 0 : y;
      M !== void 0 && (n[f] = M);
      const ht = Se[v];
      ht && u.icon && (a[ht] = u.icon);
    }
    if ((c.toLowerCase().includes("commit") || v === "latest_commit") && (u.sha && (n.latest_commit_sha = u.sha), u.url && (n.latest_commit_url = u.url), u.authored_at && (n.latest_commit_authored_at = u.authored_at), u.message && (n.latest_commit_message = u.message), !n.latest_commit_sha && h.state && h.state !== "unavailable" && (n.latest_commit_sha = h.state), u.icon && (a.last_commit = u.icon)), (c.toLowerCase().includes("release") || c.toLowerCase().includes("_tag") || v === "latest_tag") && (u.tag && (n.latest_release_tag = u.tag), !n.latest_release_tag && h.state && h.state !== "unavailable" && h.state !== "unknown" && (n.latest_release_tag = h.state)), u.html_url) {
      const f = u.html_url;
      /\/(commit|releases|tree|blob|pull|issues)\//.test(f) || (n.html_url = f);
    }
    if (u.full_name && (n.full_name = u.full_name), u.language && (n.language = u.language), u.owner_avatar && (n.owner_avatar = u.owner_avatar), u.owner_login && (n.owner_login = u.owner_login), u.owner && typeof u.owner == "object") {
      const f = u.owner;
      !n.owner_avatar && f.avatar_url && (n.owner_avatar = f.avatar_url), !n.owner_login && f.login && (n.owner_login = f.login);
    }
  }
  let p;
  if (i && o.devices?.[i]) {
    const c = o.devices[i];
    p = c.name_by_user ?? c.name ?? t, !n.html_url && c.configuration_url && (n.html_url = c.configuration_url), !n.full_name && c.name && (n.full_name = c.name);
  } else
    p = (e.friendly_name ?? t).replace(
      /\s+(Stargazers.*|Forks.*|Watchers.*|Issues.*|Pull Requests.*|Commits?.*|Releases?.*)$/i,
      ""
    ).trim() || t;
  if (!n.owner_avatar && n.full_name) {
    const c = n.full_name.split("/")[0];
    c && (n.owner_login = n.owner_login ?? c, n.owner_avatar = `https://avatars.githubusercontent.com/${c}?s=60`);
  }
  if (n.latest_release_tag && n.html_url) {
    const c = n.html_url.replace(/\/$/, "");
    n.latest_release_url = `${c}/releases/tag/${encodeURIComponent(n.latest_release_tag)}`;
  }
  return {
    entity_id: t,
    state: o.states[t].state,
    friendly_name: p,
    attributes: n,
    slot_icons: a,
    activity_sources: l
  };
}
function Pe(o) {
  if (!o) return "—";
  try {
    return new Date(o).toLocaleDateString(void 0, {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  } catch {
    return o;
  }
}
function L(o) {
  return o == null ? "—" : o >= 1e6 ? `${(o / 1e6).toFixed(1)}M` : o >= 1e3 ? `${(o / 1e3).toFixed(1)}k` : String(o);
}
function Ht(o) {
  return o.show_header === !1 || !o.title ? _ : d`
    <div class="card-header">
      ${o.show_header_icon !== !1 ? d`<div class="header-icon">
            <ha-icon class="icon-header" .icon="${"mdi:github"}"></ha-icon>
          </div>` : _}
      <span class="header-title">${o.title}</span>
    </div>
  `;
}
const Dt = C`
  .card-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 16px 8px;
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--primary-text-color, #24292e);
    border-bottom: 1px solid var(--divider-color, #e1e4e8);
  }

  .header-icon {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  .header-title {
    flex: 1;
  }

  ha-icon.icon-header {
    --mdc-icon-size: 20px;
    width: 20px;
    height: 20px;
    color: var(--primary-text-color, #24292e);
  }
`;
var ze = Object.defineProperty, Me = (o, t, e, s) => {
  for (var i = void 0, r = o.length - 1, n; r >= 0; r--)
    (n = o[r]) && (i = n(t, e, i) || i);
  return i && ze(t, e, i), i;
};
const H = [
  ["watchers", "stars", "last_commit"],
  ["pull_requests", "issues"]
], Ne = {
  stars: "mdi:star",
  forks: "mdi:source-fork",
  watchers: "mdi:eye",
  issues: "mdi:alert-circle-outline",
  pull_requests: "mdi:source-pull",
  last_commit: "mdi:source-commit",
  last_release: "mdi:tag"
}, Ut = class qt extends b {
  get hass() {
    return this._hass;
  }
  set hass(t) {
    this._hass = t, this.requestUpdate();
  }
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
      rows: [
        ["watchers", "stars", "last_commit"],
        ["pull_requests", "issues"]
      ]
    };
  }
  setConfig(t) {
    if (!t.entities || !Array.isArray(t.entities))
      throw new Error('ha-github-card: "entities" must be an array');
    const e = t.entities.filter(
      (i) => typeof i == "string" && i.trim() !== ""
    );
    let s = t.rows;
    !s?.length && (t.row2_slots || t.row3_slots) && (s = [
      t.row2_slots ?? H[0],
      t.row3_slots ?? H[1]
    ]), this._config = {
      ...qt.getStubConfig(),
      ...t,
      entities: e,
      rows: s ?? H
    };
  }
  getCardSize() {
    const t = this._config?.show_activity ? 5 : 3;
    return (this._config?.entities?.length ?? 1) * t + 1;
  }
  // ------------------------------------------------------------------
  // Render
  // ------------------------------------------------------------------
  render() {
    if (!this._config || !this.hass) return _;
    const e = (this._config.entities ?? []).map((s) => lt(this.hass, s)).filter((s) => s !== null);
    return d`
      <ha-card>
        ${Ht(this._config)}
        <div class="card-content ${this._config.compact ? "compact" : ""}">
          ${e.length === 0 ? d`<div class="empty">No GitHub entities configured.</div>` : e.map((s) => this._renderEntity(s))}
        </div>
      </ha-card>
    `;
  }
  _getRows() {
    return this._config.rows?.length ? this._config.rows : [
      this._config.row2_slots ?? H[0],
      this._config.row3_slots ?? H[1]
    ];
  }
  _renderEntity(t) {
    const e = t.attributes, s = this._getRows();
    return d`
      <div class="entity-card">
        <!-- Row 1: name (fixed left) + version (fixed right) -->
        <div class="entity-header">
          <div class="header-name">
            ${this._config.show_avatar && e.owner_avatar ? d`<img
                  class="avatar"
                  src="${e.owner_avatar}"
                  alt="${e.owner_login ?? ""}"
                  @error="${(i) => {
      i.target.style.display = "none";
    }}"
                />` : _}
            <a
              class="repo-name"
              href="${e.html_url ?? "#"}"
              target="_blank"
              rel="noopener noreferrer"
              >${e.full_name ?? t.entity_id}</a
            >
          </div>
          <div class="header-version">
            ${e.latest_release_tag ? d`<a
                  class="version-link"
                  href="${e.latest_release_url ?? "#"}"
                  target="_blank"
                  rel="noopener noreferrer"
                  >${e.latest_release_tag}</a
                >` : d`<span class="version-none">no release</span>`}
          </div>
        </div>

        <!-- Configurable rows -->
        ${s.map((i) => i.length > 0 ? d`
                <div
                  class="entity-row"
                  style="grid-template-columns: repeat(${i.length}, 1fr)"
                >
                  ${i.map((r) => {
      const n = this._matchSlotRule(r, t), a = n?.type === "background" ? `background-color: ${n.color}; border-radius: 4px; padding: 0 4px;` : "", l = n && n.type !== "background" ? n.color : "";
      return d`
                      <div class="slot-cell" style="${a}">
                        ${this._renderSlot(r, t, l)}
                      </div>
                    `;
    })}
                </div>
              ` : _)}
        ${this._config.show_activity ? d`<ha-github-activity-chart
              class="entity-activity"
              .hass="${this.hass}"
              .sources="${t.activity_sources}"
              .options="${this._config}"
            ></ha-github-activity-chart>` : _}
      </div>
    `;
  }
  _matchSlotRule(t, e) {
    const s = this._config.slot_colors?.[t];
    if (!s?.length) return null;
    const i = e.attributes, n = {
      stars: i.stargazers_count,
      forks: i.forks_count,
      watchers: i.watchers_count,
      issues: i.open_issues_count,
      pull_requests: i.open_pull_requests_count
    }[t];
    if (n === void 0) return null;
    for (const a of s) {
      const l = Number(a.value);
      if (a.op === ">" ? n > l : a.op === ">=" ? n >= l : a.op === "<" ? n < l : a.op === "<=" ? n <= l : n === l) return a;
    }
    return null;
  }
  _slotIcon(t, e) {
    const s = this._config.icons?.[t], i = e.slot_icons[t], r = s ?? i ?? Ne[t] ?? "mdi:help-circle-outline";
    return d`<ha-icon class="icon-sm" .icon="${r}"></ha-icon>`;
  }
  _renderSlot(t, e, s = "") {
    const i = e.attributes, r = s ? `color: ${s};` : "";
    switch (t) {
      case "stars":
        return d`
          ${this._slotIcon(t, e)}
          <span class="slot-value" style="${r}"
            >${L(i.stargazers_count)}</span
          >
          <span class="slot-label" style="${r}">Stars</span>
        `;
      case "forks":
        return d`
          ${this._slotIcon(t, e)}
          <span class="slot-value" style="${r}"
            >${L(i.forks_count)}</span
          >
          <span class="slot-label" style="${r}">Forks</span>
        `;
      case "watchers":
        return d`
          ${this._slotIcon(t, e)}
          <span class="slot-value" style="${r}"
            >${L(i.watchers_count)}</span
          >
          <span class="slot-label" style="${r}">Watchers</span>
        `;
      case "issues":
        return d`
          ${this._slotIcon(t, e)}
          <span class="slot-value" style="${r}"
            >${L(i.open_issues_count)}</span
          >
          <span class="slot-label" style="${r}">Issues</span>
        `;
      case "pull_requests":
        return d`
          ${this._slotIcon(t, e)}
          <span class="slot-value" style="${r}"
            >${L(i.open_pull_requests_count)}</span
          >
          <span class="slot-label" style="${r}">Pull Requests</span>
        `;
      case "last_commit":
        return i.latest_commit_sha ? d`
              ${this._slotIcon(t, e)}
              <a
                class="slot-mono-link"
                href="${i.latest_commit_url ?? "#"}"
                target="_blank"
                rel="noopener noreferrer"
                title="${i.latest_commit_message}"
                >${i.latest_commit_sha.slice(0, 7)}</a
              >
              <span class="slot-label"
                >${Pe(i.latest_commit_authored_at)}</span
              >
            ` : d`${this._slotIcon(t, e)}<span class="slot-value"
                >—</span
              >`;
      case "last_release":
        return d`
          ${this._slotIcon(t, e)}
          ${i.latest_release_tag ? d`<a
                class="slot-link"
                href="${i.latest_release_url ?? "#"}"
                target="_blank"
                rel="noopener noreferrer"
                >${i.latest_release_tag}</a
              >` : d`<span class="slot-value">—</span>`}
        `;
      default:
        return d``;
    }
  }
  static {
    this.styles = [
      Dt,
      C`
      :host {
        --gh-accent: var(--primary-color, #0366d6);
        --gh-text: var(--primary-text-color, #24292e);
        --gh-text-sec: var(--secondary-text-color, #586069);
        --gh-border: var(--divider-color, #e1e4e8);
        --gh-bg-row1: var(--secondary-background-color, #f6f8fa);
        --gh-link: var(--primary-color, #0366d6);
      }

      ha-card {
        overflow: hidden;
        border-radius: var(--ha-card-border-radius, 12px);
      }

      /* ---- Content wrapper ---- */
      .card-content {
        padding: 12px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .card-content.compact {
        gap: 6px;
      }

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

      .repo-name:hover {
        text-decoration: underline;
      }

      .header-version {
        flex-shrink: 0;
      }

      .version-link {
        font-size: 0.78rem;
        font-weight: 500;
        color: var(--gh-link);
        text-decoration: none;
        background: color-mix(in srgb, var(--gh-link) 12%, transparent);
        border-radius: 10px;
        padding: 2px 9px;
      }

      .version-link:hover {
        text-decoration: underline;
      }

      .version-none {
        font-size: 0.78rem;
        color: var(--gh-text-sec);
        opacity: 0.55;
      }

      /* ---- Rows 2 & 3: configurable grid ---- */
      .entity-row {
        display: grid; /* columns set inline via style="" */
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

      .compact .slot-cell {
        padding: 6px 10px;
      }

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

      .slot-link:hover {
        text-decoration: underline;
      }

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

      .slot-mono-link:hover {
        text-decoration: underline;
      }

      .slot-lang {
        font-weight: 600;
        color: var(--gh-text);
        background: color-mix(in srgb, var(--gh-accent) 14%, transparent);
        border-radius: 10px;
        padding: 1px 8px;
        font-size: 0.76rem;
      }

      /* ---- Activity chart below the table ---- */
      .entity-activity {
        padding: 10px 12px 8px;
        border-top: 1px solid var(--gh-border);
      }

      .compact .entity-activity {
        padding: 6px 10px 4px;
      }

      /* ---- Icons ---- */
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
    `
    ];
  }
};
Me([
  k()
], Ut.prototype, "_config");
let Le = Ut;
const It = C`
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
  .field-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
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
    box-shadow: 0 0 0 2px
      color-mix(in srgb, var(--primary-color, #0366d6) 20%, transparent);
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
  select:focus {
    outline: none;
    border-color: var(--primary-color, #0366d6);
  }
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
`;
function jt(o, t) {
  const { range: e, metrics: s, chartType: i } = Mt(o), r = (n, a) => {
    const l = a ? [...s, n] : s.filter((c) => c !== n), p = O.filter((c) => l.includes(c));
    p.length > 0 && t({ activity_metrics: p });
  };
  return d`
    <div class="field-group">
      <label class="field-label" for="activity-range">Time Range</label>
      <select
        id="activity-range"
        @change="${(n) => t({
    activity_range: n.target.value
  })}"
      >
        ${fe.map(
    (n) => d`
            <option value="${n}" ?selected="${n === e}">
              ${V[n].label}
            </option>
          `
  )}
      </select>
    </div>
    <div class="field-group">
      <label class="field-label" for="activity-chart-type">Chart Type</label>
      <select
        id="activity-chart-type"
        @change="${(n) => t({
    activity_chart_type: n.target.value
  })}"
      >
        ${ge.map(
    (n) => d`
            <option value="${n}" ?selected="${n === i}">
              ${nt[n].label}
            </option>
          `
  )}
      </select>
    </div>
    <div class="field-group">
      <span class="field-label">Metrics</span>
      <div class="activity-metrics">
        ${O.map(
    (n) => d`
            <label class="toggle-row">
              <input
                type="checkbox"
                .checked="${s.includes(n)}"
                ?disabled="${s.length === 1 && s.includes(n)}"
                @change="${(a) => r(n, a.target.checked)}"
              />
              <span
                class="activity-metric-dot"
                style="background:${m[n].color}"
              ></span>
              ${m[n].label}
            </label>
          `
  )}
      </div>
    </div>
    <p class="hint">
      Counts new commits, pull requests, issues and discussions per day from the
      recorded history of the repository's "Latest …" sensors. Only activity
      recorded by Home Assistant is shown.
    </p>
  `;
}
const Vt = C`
  .activity-metrics {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 6px 12px;
  }
  .activity-metric-dot {
    width: 10px;
    height: 10px;
    border-radius: 2px;
    flex-shrink: 0;
  }
`;
var He = Object.defineProperty, ct = (o, t, e, s) => {
  for (var i = void 0, r = o.length - 1, n; r >= 0; r--)
    (n = o[r]) && (i = n(t, e, i) || i);
  return i && He(t, e, i), i;
};
const De = [
  ["watchers", "👁  Watchers"],
  ["stars", "⭐ Stars"],
  ["forks", "🍴 Forks"],
  ["issues", "🐛 Issues"],
  ["pull_requests", "🔀 Pull Requests"],
  ["last_commit", "🔗 Last Commit"],
  ["last_release", "🏷  Latest Release"],
  ["none", "— None —"]
];
class Z extends b {
  constructor() {
    super(...arguments), this._config = void 0, this._pickerValue = "";
  }
  setConfig(t) {
    this._config = { ...t }, this.requestUpdate();
  }
  // ------------------------------------------------------------------
  // Helpers
  // ------------------------------------------------------------------
  _removeEntity(t) {
    this._fireConfigChanged({
      ...this._config,
      entities: (this._config.entities ?? []).filter((e) => e !== t)
    });
  }
  _entityPicked(t) {
    const e = t.detail?.value ?? t.target?.value ?? "";
    if (!e || !e.trim()) {
      this._pickerValue = "";
      return;
    }
    const s = this._config.entities ?? [];
    s.includes(e) || this._fireConfigChanged({
      ...this._config,
      entities: [...s, e]
    }), this._pickerValue = "";
  }
  _addCurrentEntity() {
    const t = this._pickerValue.trim();
    if (!t) return;
    const e = this._config.entities ?? [];
    e.includes(t) || this._fireConfigChanged({
      ...this._config,
      entities: [...e, t]
    }), this._pickerValue = "";
  }
  _setValue(t, e) {
    this._fireConfigChanged({ ...this._config, [t]: e });
  }
  _setSlotIcon(t, e) {
    const s = { ...this._config.icons ?? {} };
    e.trim() ? s[t] = e.trim() : delete s[t], this._fireConfigChanged({ ...this._config, icons: s });
  }
  _getRows() {
    if (this._config.rows?.length)
      return this._config.rows.map((s) => [...s]);
    const t = this._config.row2_slots ?? ["watchers", "stars", "last_commit"], e = this._config.row3_slots ?? ["pull_requests", "issues"];
    return [[...t], [...e]];
  }
  _setRowSlot(t, e, s) {
    const i = this._getRows();
    i[t][e] = s, this._fireConfigChanged({ ...this._config, rows: i });
  }
  _setRowColCount(t, e) {
    const s = this._getRows(), i = s[t];
    for (; i.length < e; ) i.push("none");
    s[t] = i.slice(0, e), this._fireConfigChanged({ ...this._config, rows: s });
  }
  _addRow() {
    const t = this._getRows();
    t.length >= 5 || this._fireConfigChanged({
      ...this._config,
      rows: [...t, ["none"]]
    });
  }
  _removeRow(t) {
    const e = this._getRows();
    this._fireConfigChanged({
      ...this._config,
      rows: e.filter((s, i) => i !== t)
    });
  }
  _addColorRule(t) {
    const e = { ...this._config.slot_colors ?? {} }, s = [...e[t] ?? []];
    s.push({
      op: ">=",
      value: 0,
      color: "var(--error-color, #f44336)",
      type: "text"
    }), e[t] = s, this._fireConfigChanged({ ...this._config, slot_colors: e });
  }
  _removeColorRule(t, e) {
    const s = { ...this._config.slot_colors ?? {} }, i = [...s[t] ?? []].filter((r, n) => n !== e);
    i.length === 0 ? delete s[t] : s[t] = i, this._fireConfigChanged({ ...this._config, slot_colors: s });
  }
  _updateColorRule(t, e, s) {
    const i = { ...this._config.slot_colors ?? {} }, r = [...i[t] ?? []];
    r[e] = { ...r[e], ...s }, i[t] = r, this._fireConfigChanged({ ...this._config, slot_colors: i });
  }
  _fireConfigChanged(t) {
    this._config = t, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: t },
        bubbles: !0,
        composed: !0
      })
    );
  }
  // ------------------------------------------------------------------
  // Render
  // ------------------------------------------------------------------
  render() {
    if (!this._config) return _;
    const t = this._config, e = t.entities ?? [], s = this._getRows(), i = this.hass ? at(this.hass) : [];
    return d`
      <div class="field-group">
        <label class="field-label" for="card-title">Card Title</label>
        <input
          id="card-title"
          type="text"
          class="text-input"
          .value="${t.title ?? ""}"
          @change="${(r) => this._setValue("title", r.target.value)}"
          placeholder="GitHub"
        />
      </div>

      <div class="section-label">GitHub Entities</div>

      ${e.length > 0 ? d`
            <div class="entity-list">
              ${e.map((r) => {
      const n = !!(this.hass && this.hass.states[r]), a = !!(this.hass && this.hass.entities?.[r]), l = !n && !a && r.includes("/") && !!this.hass && (() => {
        const [c, h] = r.split("/", 2), u = (f) => f.toLowerCase().replace(/[^a-z0-9]/g, "_"), g = u(c), v = u(h);
        return Object.keys(this.hass.states).some((f) => {
          const y = f.toLowerCase();
          return y.includes(g) && y.includes(v);
        });
      })(), p = n || a || l;
      return d`
                  <div class="entity-row ${p ? "" : "entity-warn"}">
                    <span class="entity-id">${r}</span>
                    ${p ? _ : d`<span
                          class="warn-icon"
                          title="Entity not found in HA — check ID"
                          >⚠</span
                        >`}
                    <button
                      class="remove-btn"
                      @click="${() => this._removeEntity(r)}"
                      aria-label="Remove"
                    >
                      ✕
                    </button>
                  </div>
                `;
    })}
            </div>
          ` : d`<p class="hint">No entities added yet.</p>`}

      <datalist id="github-entity-list">
        ${i.map((r) => d`<option value="${r}"></option>`)}
      </datalist>
      <div class="add-entity-row">
        <input
          type="text"
          class="text-input entity-input"
          list="github-entity-list"
          placeholder="sensor.myrepo_watchers_count"
          .value="${this._pickerValue}"
          @input="${(r) => {
      this._pickerValue = r.target.value;
    }}"
          @change="${this._entityPicked}"
        />
        <button class="add-btn" @click="${this._addCurrentEntity}">Add</button>
      </div>
      <p class="hint">
        ${i.length > 0 ? d`${i.length} GitHub entities available — pick from
            list or type any entity ID.` : d`No GitHub entities auto-detected. Type the entity ID manually
              (e.g. <em>sensor.owner_repo_watchers_count</em>).`}
      </p>

      <div class="section-label">Rows — ${s.length} / 5</div>

      ${s.map(
      (r, n) => d`
          <div class="row-block">
            <div class="row-block-header">
              <span class="row-block-title">Row ${n + 1}</span>
              <div class="col-count-btns">
                <span class="col-count-label">Cols:</span>
                ${[1, 2, 3].map(
        (a) => d`
                    <button
                      class="col-count-btn ${r.length === a ? "active" : ""}"
                      @click="${() => this._setRowColCount(n, a)}"
                    >
                      ${a}
                    </button>
                  `
      )}
              </div>
              <button
                class="remove-btn row-remove-btn"
                @click="${() => this._removeRow(n)}"
                aria-label="Remove row"
                ?disabled="${s.length <= 1}"
              >
                ✕
              </button>
            </div>
            <div class="slot-row">
              ${r.map(
        (a, l) => this._renderSlotSelect(
          n,
          l,
          a,
          `Col ${l + 1}`
        )
      )}
            </div>
          </div>
        `
    )}
      ${s.length < 5 ? d`
            <button class="add-row-btn" @click="${() => this._addRow()}">
              + Add Row
            </button>
          ` : _}

      <div class="section-label">Conditional Colors</div>
      ${[
      ["stars", "Stars"],
      ["forks", "Forks"],
      ["watchers", "Watchers"],
      ["issues", "Issues"],
      ["pull_requests", "Pull Requests"]
    ].map(([r, n]) => {
      const a = t.slot_colors?.[r] ?? [];
      return d`
          <div class="color-slot-block">
            <div class="color-slot-header">
              <span class="color-slot-label">${n}</span>
              <button
                class="add-color-btn"
                @click="${() => this._addColorRule(r)}"
              >
                + Rule
              </button>
            </div>
            ${a.map(
        (l, p) => d`
                <div class="color-rule-row">
                  <select
                    class="color-type-select"
                    @change="${(c) => this._updateColorRule(r, p, {
          type: c.target.value
        })}"
                  >
                    <option
                      value="text"
                      ?selected="${l.type !== "background"}"
                    >
                      Text
                    </option>
                    <option
                      value="background"
                      ?selected="${l.type === "background"}"
                    >
                      BG
                    </option>
                  </select>
                  <select
                    class="color-op-select"
                    @change="${(c) => this._updateColorRule(r, p, {
          op: c.target.value
        })}"
                  >
                    ${[">", ">=", "<", "<=", "=="].map(
          (c) => d`
                        <option value="${c}" ?selected="${l.op === c}">
                          ${c}
                        </option>
                      `
        )}
                  </select>
                  <input
                    type="number"
                    class="text-input color-threshold-input"
                    .value="${String(l.value)}"
                    @change="${(c) => this._updateColorRule(r, p, {
          value: parseFloat(c.target.value) || 0
        })}"
                  />
                  <div
                    class="color-preview"
                    style="background:${l.color}"
                  ></div>
                  <input
                    type="text"
                    class="text-input color-color-input"
                    .value="${l.color}"
                    placeholder="#f44336"
                    @change="${(c) => this._updateColorRule(r, p, {
          color: c.target.value
        })}"
                  />
                  <button
                    class="remove-btn"
                    @click="${() => this._removeColorRule(r, p)}"
                  >
                    ✕
                  </button>
                </div>
              `
      )}
          </div>
        `;
    })}

      <div class="section-label">Visual Options</div>
      <label class="toggle-row">
        <input
          type="checkbox"
          .checked="${t.show_header !== !1}"
          @change="${(r) => this._setValue(
      "show_header",
      r.target.checked
    )}"
        />
        Show Card Header (title bar)
      </label>
      <label class="toggle-row">
        <input
          type="checkbox"
          .checked="${t.show_header_icon !== !1}"
          @change="${(r) => this._setValue(
      "show_header_icon",
      r.target.checked
    )}"
        />
        Show GitHub Icon in Header
      </label>
      <label class="toggle-row">
        <input
          type="checkbox"
          .checked="${t.show_avatar !== !1}"
          @change="${(r) => this._setValue(
      "show_avatar",
      r.target.checked
    )}"
        />
        Show Owner Avatar
      </label>
      <label class="toggle-row">
        <input
          type="checkbox"
          .checked="${!!t.compact}"
          @change="${(r) => this._setValue("compact", r.target.checked)}"
        />
        Compact Layout
      </label>

      <div class="section-label">Activity Chart</div>
      <label class="toggle-row">
        <input
          type="checkbox"
          .checked="${!!t.show_activity}"
          @change="${(r) => this._setValue(
      "show_activity",
      r.target.checked
    )}"
        />
        Show activity chart below each repository
      </label>
      ${t.show_activity ? jt(
      t,
      (r) => this._fireConfigChanged({ ...this._config, ...r })
    ) : _}
    `;
  }
  _renderSlotSelect(t, e, s, i) {
    const r = this._config.icons?.[s] ?? "";
    return d`
      <div class="slot-select-wrap">
        <span class="slot-col-label">${i}</span>
        <select
          @change="${(n) => this._setRowSlot(
      t,
      e,
      n.target.value
    )}"
        >
          ${De.map(
      ([n, a]) => d`
              <option value="${n}" ?selected="${n === s}">
                ${a}
              </option>
            `
    )}
        </select>
        ${s !== "none" ? d`
              <div class="icon-override-row">
                ${r ? d`<ha-icon
                      class="icon-preview"
                      .icon="${r}"
                    ></ha-icon>` : d`<span class="icon-preview-placeholder"
                      >&#xFFFD;</span
                    >`}
                <input
                  type="text"
                  class="text-input icon-input"
                  placeholder="mdi:star"
                  .value="${r}"
                  title="Override icon (leave empty to use sensor default)"
                  @change="${(n) => this._setSlotIcon(
      s,
      n.target.value
    )}"
                />
              </div>
            ` : _}
      </div>
    `;
  }
  static {
    this.styles = [
      It,
      Vt,
      C`
      .entity-list {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .entity-row {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px 8px 6px 12px;
        border: 1px solid var(--primary-color, #0366d6);
        border-radius: 6px;
        background: color-mix(
          in srgb,
          var(--primary-color, #0366d6) 6%,
          transparent
        );
      }
      .entity-row.entity-warn {
        border-color: var(--warning-color, #f59e0b);
        background: color-mix(
          in srgb,
          var(--warning-color, #f59e0b) 8%,
          transparent
        );
      }
      .entity-id {
        flex: 1;
        font-size: 0.85rem;
        color: var(--primary-text-color);
        word-break: break-all;
      }
      .warn-icon {
        color: var(--warning-color, #f59e0b);
        font-size: 1rem;
        cursor: help;
        flex-shrink: 0;
      }
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
      .remove-btn:hover {
        background: color-mix(
          in srgb,
          var(--error-color, #f44336) 12%,
          transparent
        );
        color: var(--error-color, #f44336);
      }
      .add-entity-row {
        display: flex;
        gap: 8px;
        align-items: center;
      }
      .entity-input {
        flex: 1;
        margin-bottom: 0;
      }
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
      .add-btn:hover {
        opacity: 0.88;
      }
      .slot-row {
        display: flex;
        gap: 8px;
      }
      .slot-select-wrap {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 4px;
        min-width: 0;
      }
      .slot-col-label {
        font-size: 0.72rem;
        font-weight: 700;
        color: var(--secondary-text-color);
        text-transform: uppercase;
        letter-spacing: 0.06em;
      }
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
      .icon-input {
        font-size: 0.75rem;
        padding: 4px 6px;
      }
      .row-block {
        border: 1px solid var(--divider-color, #e1e4e8);
        border-radius: 8px;
        padding: 10px 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        background: color-mix(
          in srgb,
          var(--primary-text-color, #000) 2%,
          transparent
        );
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
      .col-count-btn:hover {
        background: color-mix(
          in srgb,
          var(--primary-color, #0366d6) 10%,
          transparent
        );
      }
      .col-count-btn.active {
        background: var(--primary-color, #0366d6);
        color: var(--text-primary-color, #fff);
        border-color: var(--primary-color, #0366d6);
      }
      .row-remove-btn {
        padding: 2px 6px;
      }
      .row-remove-btn:disabled {
        opacity: 0.35;
        cursor: not-allowed;
      }
      .add-row-btn {
        align-self: flex-start;
        padding: 7px 14px;
        border: 1px dashed var(--primary-color, #0366d6);
        border-radius: 6px;
        background: color-mix(
          in srgb,
          var(--primary-color, #0366d6) 6%,
          transparent
        );
        color: var(--primary-color, #0366d6);
        font-size: 0.85rem;
        font-weight: 600;
        cursor: pointer;
        font-family: inherit;
      }
      .add-row-btn:hover {
        background: color-mix(
          in srgb,
          var(--primary-color, #0366d6) 14%,
          transparent
        );
      }
      .color-slot-block {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .color-slot-header {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .color-slot-label {
        flex: 1;
        font-size: 0.82rem;
        font-weight: 600;
        color: var(--primary-text-color);
      }
      .add-color-btn {
        padding: 3px 10px;
        border: 1px dashed var(--primary-color, #0366d6);
        border-radius: 5px;
        background: color-mix(
          in srgb,
          var(--primary-color, #0366d6) 6%,
          transparent
        );
        color: var(--primary-color, #0366d6);
        font-size: 0.78rem;
        font-weight: 600;
        cursor: pointer;
        font-family: inherit;
      }
      .add-color-btn:hover {
        background: color-mix(
          in srgb,
          var(--primary-color, #0366d6) 14%,
          transparent
        );
      }
      .color-rule-row {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 4px 8px;
        border: 1px solid var(--divider-color, #e1e4e8);
        border-radius: 6px;
        background: color-mix(
          in srgb,
          var(--primary-text-color, #000) 2%,
          transparent
        );
      }
      .color-op-select {
        width: 60px;
        flex-shrink: 0;
        padding: 4px 4px;
        font-size: 0.82rem;
      }
      .color-threshold-input {
        width: 70px;
        flex-shrink: 0;
        padding: 4px 6px;
        font-size: 0.82rem;
      }
      .color-color-input {
        flex: 1;
        padding: 4px 6px;
        font-size: 0.82rem;
      }
      .color-preview {
        width: 18px;
        height: 18px;
        border-radius: 3px;
        flex-shrink: 0;
        border: 1px solid var(--divider-color, #e1e4e8);
      }
    `
    ];
  }
}
ct([
  P({ attribute: !1 })
], Z.prototype, "hass");
ct([
  k()
], Z.prototype, "_config");
ct([
  k()
], Z.prototype, "_pickerValue");
var Ue = Object.defineProperty, qe = (o, t, e, s) => {
  for (var i = void 0, r = o.length - 1, n; r >= 0; r--)
    (n = o[r]) && (i = n(t, e, i) || i);
  return i && Ue(t, e, i), i;
};
class Gt extends b {
  get hass() {
    return this._hass;
  }
  set hass(t) {
    this._hass = t, this.requestUpdate();
  }
  // ------------------------------------------------------------------
  // Lovelace API
  // ------------------------------------------------------------------
  static getConfigElement() {
    return document.createElement("ha-github-activity-card-editor");
  }
  static getStubConfig(t) {
    return {
      type: "custom:ha-github-activity-card",
      entity: t ? at(t)[0] ?? "" : "",
      show_header: !0,
      show_header_icon: !0,
      activity_range: zt,
      activity_metrics: [...Pt]
    };
  }
  setConfig(t) {
    if (typeof t.entity != "string")
      throw new Error('ha-github-activity-card: "entity" must be a string');
    this._config = { ...t, entity: t.entity.trim() };
  }
  getCardSize() {
    return 3;
  }
  // ------------------------------------------------------------------
  // Render
  // ------------------------------------------------------------------
  render() {
    if (!this._config || !this.hass) return _;
    const t = this._config.entity ? lt(this.hass, this._config.entity) : null, e = this._config.title || t?.attributes.full_name || t?.friendly_name || "GitHub Activity";
    return d`
      <ha-card>
        ${Ht({ ...this._config, title: e })}
        <div class="card-content">
          ${t ? d`<ha-github-activity-chart
                .hass="${this.hass}"
                .sources="${t.activity_sources}"
                .options="${this._config}"
              ></ha-github-activity-chart>` : d`<div class="empty">
                ${this._config.entity ? `Entity "${this._config.entity}" not found.` : "No GitHub entity configured."}
              </div>`}
        </div>
      </ha-card>
    `;
  }
  static {
    this.styles = [
      Dt,
      C`
      ha-card {
        overflow: hidden;
        border-radius: var(--ha-card-border-radius, 12px);
      }

      .card-content {
        padding: 12px 16px 14px;
      }

      .empty {
        color: var(--secondary-text-color, #586069);
        padding: 16px;
        text-align: center;
        font-style: italic;
      }
    `
    ];
  }
}
qe([
  k()
], Gt.prototype, "_config");
var Ie = Object.defineProperty, Ft = (o, t, e, s) => {
  for (var i = void 0, r = o.length - 1, n; r >= 0; r--)
    (n = o[r]) && (i = n(t, e, i) || i);
  return i && Ie(t, e, i), i;
};
class dt extends b {
  setConfig(t) {
    this._config = { ...t };
  }
  _update(t) {
    if (!this._config) return;
    const e = { ...this._config, ...t };
    this._config = e, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: e },
        bubbles: !0,
        composed: !0
      })
    );
  }
  render() {
    if (!this._config) return _;
    const t = this._config, e = this.hass ? at(this.hass) : [];
    return d`
      <div class="field-group">
        <label class="field-label" for="activity-entity">
          GitHub Repository Entity
        </label>
        <input
          id="activity-entity"
          type="text"
          class="text-input"
          list="activity-entity-list"
          placeholder="sensor.myrepo_latest_commit"
          .value="${t.entity ?? ""}"
          @change="${(s) => this._update({
      entity: s.target.value.trim()
    })}"
        />
        <datalist id="activity-entity-list">
          ${e.map((s) => d`<option value="${s}"></option>`)}
        </datalist>
        <p class="hint">
          Any sensor of the repository device works — the activity sensors are
          discovered automatically.
        </p>
      </div>

      <div class="field-group">
        <label class="field-label" for="activity-title">Card Title</label>
        <input
          id="activity-title"
          type="text"
          class="text-input"
          placeholder="Repository name"
          .value="${t.title ?? ""}"
          @change="${(s) => this._update({
      title: s.target.value || void 0
    })}"
        />
      </div>

      <div class="section-label">Activity Chart</div>
      ${jt(t, (s) => this._update(s))}

      <div class="section-label">Visual Options</div>
      <label class="toggle-row">
        <input
          type="checkbox"
          .checked="${t.show_header !== !1}"
          @change="${(s) => this._update({
      show_header: s.target.checked
    })}"
        />
        Show Card Header (title bar)
      </label>
      <label class="toggle-row">
        <input
          type="checkbox"
          .checked="${t.show_header_icon !== !1}"
          @change="${(s) => this._update({
      show_header_icon: s.target.checked
    })}"
        />
        Show GitHub Icon in Header
      </label>
    `;
  }
  static {
    this.styles = [It, Vt];
  }
}
Ft([
  P({ attribute: !1 })
], dt.prototype, "hass");
Ft([
  k()
], dt.prototype, "_config");
var je = Object.defineProperty, G = (o, t, e, s) => {
  for (var i = void 0, r = o.length - 1, n; r >= 0; r--)
    (n = o[r]) && (i = n(t, e, i) || i);
  return i && je(t, e, i), i;
};
const Ve = 7, Ge = 10, At = 8;
class z extends b {
  constructor() {
    super(...arguments), this.sources = {}, this.options = {}, this._days = [], this._loadState = "loading", this._chartRenderers = {
      line: (t) => this._renderLine(t),
      bar: (t) => this._renderBars(t)
    };
  }
  willUpdate(t) {
    (t.has("hass") || t.has("sources") || t.has("options")) && this._refresh();
  }
  _resolved() {
    return Mt(this.options);
  }
  _refresh() {
    const t = this.hass;
    if (!t) return;
    const { range: e, metrics: s } = this._resolved(), i = s.map((a) => this.sources[a]).filter((a) => !!a);
    if (i.length === 0) {
      this._requestKey = void 0, this._loadState = "no-sources";
      return;
    }
    const r = /* @__PURE__ */ new Date(), n = `${s.join(",")}#${Lt(t, i, e, r)}`;
    n !== this._requestKey && (this._requestKey = n, this._loadState !== "ready" && (this._loadState = "loading"), ke(t, i, e, r).then((a) => {
      n === this._requestKey && (this._days = Ae(
        we(a, t.states, i),
        this.sources,
        s,
        e,
        r
      ), this._loadState = "ready");
    }).catch(() => {
      n === this._requestKey && (this._loadState = "error");
    }));
  }
  // ------------------------------------------------------------------
  // Render
  // ------------------------------------------------------------------
  render() {
    const { range: t, metrics: e } = this._resolved(), s = e.filter((r) => this.sources[r]), i = V[t].label;
    return d`
      <div class="activity">
        <div class="activity-header">
          <span class="activity-title">Activity · ${i}</span>
          ${this._loadState === "ready" ? this._renderLegend(s) : _}
        </div>
        ${this._renderBody(s)}
      </div>
    `;
  }
  _renderBody(t) {
    switch (this._loadState) {
      case "no-sources":
        return d`<div class="activity-message">
          No activity sensors found for this repository.
        </div>`;
      case "error":
        return d`<div class="activity-message">
          Activity history unavailable.
        </div>`;
      case "loading":
        return d`<div class="activity-message">Loading activity…</div>`;
      case "ready":
        return this._renderChart(t);
    }
  }
  _renderLegend(t) {
    return d`
      <div class="legend">
        ${t.map((e) => {
      const s = this._days.reduce((r, n) => r + n.counts[e], 0), i = m[e];
      return d`
            <span class="legend-item" title="${s} ${i.label}">
              <span class="legend-dot" style="background:${i.color}"></span>
              ${i.label}
              <span class="legend-count">${s}</span>
            </span>
          `;
    })}
      </div>
    `;
  }
  _renderChart(t) {
    const { chartType: e } = this._resolved(), s = this._days.every((i) => i.total === 0);
    return d`
      <div class="chart" role="img" aria-label="${this._ariaSummary(t)}">
        <div class="plot">
          ${this._chartRenderers[e](t)}
          ${s ? d`<div class="chart-empty">No activity in this period</div>` : _}
        </div>
        ${this._renderAxis()}
      </div>
    `;
  }
  _columnsStyle() {
    return `grid-template-columns: repeat(${this._days.length}, 1fr)`;
  }
  _renderAxis() {
    const t = Math.ceil(this._days.length / Ge), e = this._days.length - 1;
    return d`
      <div class="axis" style="${this._columnsStyle()}">
        ${this._days.map(
      (s, i) => d`
            <span class="day-label">
              ${(e - i) % t === 0 ? this._formatDay(s.date) : ""}
            </span>
          `
    )}
      </div>
    `;
  }
  _renderBars(t) {
    const e = Math.max(0, ...this._days.map((s) => s.total));
    return d`
      <div class="bars" style="${this._columnsStyle()}">
        ${this._days.map(
      (s) => d`
            <div class="bar" title="${this._dayTooltip(s, t)}">
              ${t.map(
        (i) => s.counts[i] > 0 ? d`<div
                      class="segment"
                      style="height:${s.counts[i] / e * 100}%;background:${m[i].color}"
                    ></div>` : _
      )}
            </div>
          `
    )}
      </div>
    `;
  }
  _renderLine(t) {
    const e = Math.max(
      0,
      ...this._days.flatMap((a) => t.map((l) => a.counts[l]))
    ), s = this._days.length, i = (a) => (a + 0.5) / s * 100, r = (a) => 100 - At - (e > 0 ? a / e * (100 - 2 * At) : 0), n = [...t].reverse();
    return d`
      <svg
        class="lines"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line class="baseline" x1="0" x2="100" y1="${r(0)}" y2="${r(0)}" />
        ${e > 0 ? xt`<line class="gridline" x1="0" x2="100" y1="${r(e)}" y2="${r(e)}" />` : _}
        ${n.map(
      (a) => xt`
            <polyline
              class="series"
              stroke="${m[a].color}"
              points="${this._days.map((l, p) => `${i(p)},${r(l.counts[a])}`).join(" ")}"
            />
          `
    )}
      </svg>
      ${n.map(
      (a) => this._days.map(
        (l, p) => l.counts[a] > 0 ? d`<span
                class="point"
                style="left:${i(p)}%;top:${r(
          l.counts[a]
        )}%;background:${m[a].color}"
              ></span>` : _
      )
    )}
      ${e > 0 ? d`<span class="y-max" style="top:${r(e)}%">${e}</span>` : _}
      <div class="hover-columns" style="${this._columnsStyle()}">
        ${this._days.map(
      (a) => d`<div
              class="hover-column"
              title="${this._dayTooltip(a, t)}"
            ></div>`
    )}
      </div>
    `;
  }
  _formatDay(t) {
    const e = this.hass?.language;
    return this._days.length <= Ve ? t.toLocaleDateString(e, { weekday: "short" }) : t.toLocaleDateString(e, { day: "numeric", month: "numeric" });
  }
  _dayTooltip(t, e) {
    const s = t.date.toLocaleDateString(this.hass?.language, {
      weekday: "short",
      day: "numeric",
      month: "short"
    }), i = e.map(
      (r) => `${t.counts[r]} ${m[r].label}`
    );
    return `${s}: ${i.join(", ")}`;
  }
  _ariaSummary(t) {
    return `Activity: ${t.map((s) => `${this._days.reduce((r, n) => r + n.counts[s], 0)} ${m[s].label}`).join(", ")}`;
  }
  static {
    this.styles = C`
    :host {
      display: block;
      --gh-activity-chart-height: 64px;
    }

    .activity {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .activity-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 4px 12px;
    }

    .activity-title {
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--secondary-text-color, #586069);
    }

    .legend {
      display: flex;
      flex-wrap: wrap;
      gap: 4px 10px;
    }

    .legend-item {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 0.72rem;
      color: var(--secondary-text-color, #586069);
    }

    .legend-dot {
      width: 8px;
      height: 8px;
      border-radius: 2px;
    }

    .legend-count {
      font-weight: 700;
      color: var(--primary-text-color, #24292e);
    }

    .chart {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .plot {
      position: relative;
      height: var(--gh-activity-chart-height);
    }

    .bars,
    .axis,
    .hover-columns {
      display: grid;
      gap: 4px;
    }

    .bars {
      height: 100%;
    }

    .bar {
      display: flex;
      flex-direction: column-reverse;
      min-width: 0;
      border-radius: 3px;
      overflow: hidden;
      background: color-mix(
        in srgb,
        var(--primary-text-color, #24292e) 5%,
        transparent
      );
    }

    .segment {
      width: 100%;
      flex-shrink: 0;
    }

    .lines {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      overflow: visible;
    }

    .baseline,
    .gridline {
      stroke: var(--divider-color, rgba(0, 0, 0, 0.12));
      stroke-width: 1;
      vector-effect: non-scaling-stroke;
    }

    .gridline {
      stroke-dasharray: 3 3;
    }

    .series {
      fill: none;
      stroke-width: 2;
      stroke-linejoin: round;
      stroke-linecap: round;
      vector-effect: non-scaling-stroke;
    }

    .point {
      position: absolute;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 0 1.5px var(--card-background-color, #fff);
      pointer-events: none;
    }

    .y-max {
      position: absolute;
      left: 0;
      transform: translateY(-120%);
      font-size: 0.62rem;
      line-height: 1;
      color: var(--secondary-text-color, #586069);
      pointer-events: none;
    }

    .hover-columns {
      position: absolute;
      inset: 0;
    }

    .hover-column {
      border-radius: 3px;
    }

    .hover-column:hover {
      background: color-mix(
        in srgb,
        var(--primary-text-color, #24292e) 6%,
        transparent
      );
    }

    .day-label {
      font-size: 0.68rem;
      text-align: center;
      color: var(--secondary-text-color, #586069);
      white-space: nowrap;
      overflow: hidden;
      min-height: 1em;
    }

    .chart-empty {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-style: italic;
      color: var(--secondary-text-color, #586069);
      pointer-events: none;
    }

    .activity-message {
      font-size: 0.78rem;
      font-style: italic;
      color: var(--secondary-text-color, #586069);
      padding: 8px 0;
    }
  `;
  }
}
G([
  P({ attribute: !1 })
], z.prototype, "hass");
G([
  P({ attribute: !1 })
], z.prototype, "sources");
G([
  P({ attribute: !1 })
], z.prototype, "options");
G([
  k()
], z.prototype, "_days");
G([
  k()
], z.prototype, "_loadState");
const Ct = "https://github.com/dmoo500/ha-github-card", Fe = [
  ["ha-github-activity-chart", z],
  ["ha-github-card", Le],
  ["ha-github-card-editor", Z],
  ["ha-github-activity-card", Gt],
  ["ha-github-activity-card-editor", dt]
];
for (const [o, t] of Fe)
  customElements.get(o) || customElements.define(o, t);
window.customCards ??= [];
const Be = window.customCards;
Be.push(
  {
    type: "ha-github-card",
    name: "GitHub Card",
    description: "Display information from your GitHub repositories tracked via the GitHub integration.",
    preview: !0,
    documentationURL: Ct
  },
  {
    type: "ha-github-activity-card",
    name: "GitHub Activity Card",
    description: "Daily commits, pull requests and issues of a GitHub repository, based on the recorded sensor history.",
    preview: !0,
    documentationURL: Ct
  }
);
export {
  Gt as GithubActivityCard,
  dt as GithubActivityCardEditor,
  z as GithubActivityChart,
  Le as GithubCard,
  Z as GithubCardEditor
};
//# sourceMappingURL=ha-github-card.js.map
