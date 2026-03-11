const T = globalThis, V = T.ShadowRoot && (T.ShadyCSS === void 0 || T.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, F = /* @__PURE__ */ Symbol(), Y = /* @__PURE__ */ new WeakMap();
let he = class {
  constructor(e, t, s) {
    if (this._$cssResult$ = !0, s !== F) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
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
const be = (o) => new he(typeof o == "string" ? o : o + "", void 0, F), de = (o, ...e) => {
  const t = o.length === 1 ? o[0] : e.reduce((s, r, n) => s + ((i) => {
    if (i._$cssResult$ === !0) return i.cssText;
    if (typeof i == "number") return i;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + i + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + o[n + 1], o[0]);
  return new he(t, o, F);
}, $e = (o, e) => {
  if (V) o.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const s = document.createElement("style"), r = T.litNonce;
    r !== void 0 && s.setAttribute("nonce", r), s.textContent = t.cssText, o.appendChild(s);
  }
}, ee = V ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const s of e.cssRules) t += s.cssText;
  return be(t);
})(o) : o;
const { is: xe, defineProperty: we, getOwnPropertyDescriptor: ye, getOwnPropertyNames: Ae, getOwnPropertySymbols: Ce, getPrototypeOf: ke } = Object, q = globalThis, te = q.trustedTypes, Ee = te ? te.emptyScript : "", Se = q.reactiveElementPolyfillSupport, P = (o, e) => o, N = { toAttribute(o, e) {
  switch (e) {
    case Boolean:
      o = o ? Ee : null;
      break;
    case Object:
    case Array:
      o = o == null ? o : JSON.stringify(o);
  }
  return o;
}, fromAttribute(o, e) {
  let t = o;
  switch (e) {
    case Boolean:
      t = o !== null;
      break;
    case Number:
      t = o === null ? null : Number(o);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(o);
      } catch {
        t = null;
      }
  }
  return t;
} }, W = (o, e) => !xe(o, e), se = { attribute: !0, type: String, converter: N, reflect: !1, useDefault: !1, hasChanged: W };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), q.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let w = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = se) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), r = this.getPropertyDescriptor(e, s, t);
      r !== void 0 && we(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, t, s) {
    const { get: r, set: n } = ye(this.prototype, e) ?? { get() {
      return this[t];
    }, set(i) {
      this[t] = i;
    } };
    return { get: r, set(i) {
      const c = r?.call(this);
      n?.call(this, i), this.requestUpdate(e, c, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? se;
  }
  static _$Ei() {
    if (this.hasOwnProperty(P("elementProperties"))) return;
    const e = ke(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(P("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(P("properties"))) {
      const t = this.properties, s = [...Ae(t), ...Ce(t)];
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
      const n = (s.converter?.toAttribute !== void 0 ? s.converter : N).toAttribute(t, s.type);
      this._$Em = e, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const s = this.constructor, r = s._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const n = s.getPropertyOptions(r), i = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : N;
      this._$Em = r;
      const c = i.fromAttribute(t, n.type);
      this[r] = c ?? this._$Ej?.get(r) ?? c, this._$Em = null;
    }
  }
  requestUpdate(e, t, s, r = !1, n) {
    if (e !== void 0) {
      const i = this.constructor;
      if (r === !1 && (n = this[e]), s ??= i.getPropertyOptions(e), !((s.hasChanged ?? W)(n, t) || s.useDefault && s.reflect && n === this._$Ej?.get(e) && !this.hasAttribute(i._$Eu(e, s)))) return;
      this.C(e, t, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: s, reflect: r, wrapped: n }, i) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, i ?? t ?? this[e]), n !== !0 || i !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (t = void 0), this._$AL.set(e, t)), r === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        for (const [r, n] of this._$Ep) this[r] = n;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [r, n] of s) {
        const { wrapped: i } = n, c = this[r];
        i !== !0 || this._$AL.has(r) || c === void 0 || this.C(r, void 0, n, c);
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
w.elementStyles = [], w.shadowRootOptions = { mode: "open" }, w[P("elementProperties")] = /* @__PURE__ */ new Map(), w[P("finalized")] = /* @__PURE__ */ new Map(), Se?.({ ReactiveElement: w }), (q.reactiveElementVersions ??= []).push("2.1.2");
const I = globalThis, re = (o) => o, M = I.trustedTypes, oe = M ? M.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, ue = "$lit$", m = `lit$${Math.random().toFixed(9).slice(2)}$`, pe = "?" + m, Re = `<${pe}>`, x = document, O = () => x.createComment(""), z = (o) => o === null || typeof o != "object" && typeof o != "function", B = Array.isArray, Pe = (o) => B(o) || typeof o?.[Symbol.iterator] == "function", G = `[ 	
\f\r]`, E = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ie = /-->/g, ne = />/g, b = RegExp(`>|${G}(?:([^\\s"'>=/]+)(${G}*=${G}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ae = /'/g, le = /"/g, fe = /^(?:script|style|textarea|title)$/i, Oe = (o) => (e, ...t) => ({ _$litType$: o, strings: e, values: t }), u = Oe(1), A = /* @__PURE__ */ Symbol.for("lit-noChange"), p = /* @__PURE__ */ Symbol.for("lit-nothing"), ce = /* @__PURE__ */ new WeakMap(), $ = x.createTreeWalker(x, 129);
function _e(o, e) {
  if (!B(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return oe !== void 0 ? oe.createHTML(e) : e;
}
const ze = (o, e) => {
  const t = o.length - 1, s = [];
  let r, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", i = E;
  for (let c = 0; c < t; c++) {
    const h = o[c];
    let a, d, l = -1, _ = 0;
    for (; _ < h.length && (i.lastIndex = _, d = i.exec(h), d !== null); ) _ = i.lastIndex, i === E ? d[1] === "!--" ? i = ie : d[1] !== void 0 ? i = ne : d[2] !== void 0 ? (fe.test(d[2]) && (r = RegExp("</" + d[2], "g")), i = b) : d[3] !== void 0 && (i = b) : i === b ? d[0] === ">" ? (i = r ?? E, l = -1) : d[1] === void 0 ? l = -2 : (l = i.lastIndex - d[2].length, a = d[1], i = d[3] === void 0 ? b : d[3] === '"' ? le : ae) : i === le || i === ae ? i = b : i === ie || i === ne ? i = E : (i = b, r = void 0);
    const f = i === b && o[c + 1].startsWith("/>") ? " " : "";
    n += i === E ? h + Re : l >= 0 ? (s.push(a), h.slice(0, l) + ue + h.slice(l) + m + f) : h + m + (l === -2 ? c : f);
  }
  return [_e(o, n + (o[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class H {
  constructor({ strings: e, _$litType$: t }, s) {
    let r;
    this.parts = [];
    let n = 0, i = 0;
    const c = e.length - 1, h = this.parts, [a, d] = ze(e, t);
    if (this.el = H.createElement(a, s), $.currentNode = this.el.content, t === 2 || t === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (r = $.nextNode()) !== null && h.length < c; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const l of r.getAttributeNames()) if (l.endsWith(ue)) {
          const _ = d[i++], f = r.getAttribute(l).split(m), g = /([.?@])?(.*)/.exec(_);
          h.push({ type: 1, index: n, name: g[2], strings: f, ctor: g[1] === "." ? Ue : g[1] === "?" ? Te : g[1] === "@" ? Ne : L }), r.removeAttribute(l);
        } else l.startsWith(m) && (h.push({ type: 6, index: n }), r.removeAttribute(l));
        if (fe.test(r.tagName)) {
          const l = r.textContent.split(m), _ = l.length - 1;
          if (_ > 0) {
            r.textContent = M ? M.emptyScript : "";
            for (let f = 0; f < _; f++) r.append(l[f], O()), $.nextNode(), h.push({ type: 2, index: ++n });
            r.append(l[_], O());
          }
        }
      } else if (r.nodeType === 8) if (r.data === pe) h.push({ type: 2, index: n });
      else {
        let l = -1;
        for (; (l = r.data.indexOf(m, l + 1)) !== -1; ) h.push({ type: 7, index: n }), l += m.length - 1;
      }
      n++;
    }
  }
  static createElement(e, t) {
    const s = x.createElement("template");
    return s.innerHTML = e, s;
  }
}
function C(o, e, t = o, s) {
  if (e === A) return e;
  let r = s !== void 0 ? t._$Co?.[s] : t._$Cl;
  const n = z(e) ? void 0 : e._$litDirective$;
  return r?.constructor !== n && (r?._$AO?.(!1), n === void 0 ? r = void 0 : (r = new n(o), r._$AT(o, t, s)), s !== void 0 ? (t._$Co ??= [])[s] = r : t._$Cl = r), r !== void 0 && (e = C(o, r._$AS(o, e.values), r, s)), e;
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
    const { el: { content: t }, parts: s } = this._$AD, r = (e?.creationScope ?? x).importNode(t, !0);
    $.currentNode = r;
    let n = $.nextNode(), i = 0, c = 0, h = s[0];
    for (; h !== void 0; ) {
      if (i === h.index) {
        let a;
        h.type === 2 ? a = new U(n, n.nextSibling, this, e) : h.type === 1 ? a = new h.ctor(n, h.name, h.strings, this, e) : h.type === 6 && (a = new Me(n, this, e)), this._$AV.push(a), h = s[++c];
      }
      i !== h?.index && (n = $.nextNode(), i++);
    }
    return $.currentNode = x, r;
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
    e = C(this, e, t), z(e) ? e === p || e == null || e === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : e !== this._$AH && e !== A && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Pe(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== p && z(this._$AH) ? this._$AA.nextSibling.data = e : this.T(x.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: s } = e, r = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = H.createElement(_e(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === r) this._$AH.p(t);
    else {
      const n = new He(r, this), i = n.u(this.options);
      n.p(t), this.T(i), this._$AH = n;
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
    for (const n of e) r === t.length ? t.push(s = new U(this.O(O()), this.O(O()), this, this.options)) : s = t[r], s._$AI(n), r++;
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
class L {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, s, r, n) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = p;
  }
  _$AI(e, t = this, s, r) {
    const n = this.strings;
    let i = !1;
    if (n === void 0) e = C(this, e, t, 0), i = !z(e) || e !== this._$AH && e !== A, i && (this._$AH = e);
    else {
      const c = e;
      let h, a;
      for (e = n[0], h = 0; h < n.length - 1; h++) a = C(this, c[s + h], t, h), a === A && (a = this._$AH[h]), i ||= !z(a) || a !== this._$AH[h], a === p ? e = p : e !== p && (e += (a ?? "") + n[h + 1]), this._$AH[h] = a;
    }
    i && !r && this.j(e);
  }
  j(e) {
    e === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Ue extends L {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === p ? void 0 : e;
  }
}
class Te extends L {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== p);
  }
}
class Ne extends L {
  constructor(e, t, s, r, n) {
    super(e, t, s, r, n), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = C(this, e, t, 0) ?? p) === A) return;
    const s = this._$AH, r = e === p && s !== p || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, n = e !== p && (s === p || r);
    r && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
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
    C(this, e);
  }
}
const De = I.litHtmlPolyfillSupport;
De?.(H, U), (I.litHtmlVersions ??= []).push("3.3.2");
const qe = (o, e, t) => {
  const s = t?.renderBefore ?? e;
  let r = s._$litPart$;
  if (r === void 0) {
    const n = t?.renderBefore ?? null;
    s._$litPart$ = r = new U(e.insertBefore(O(), n), n, void 0, t ?? {});
  }
  return r._$AI(o), r;
};
const K = globalThis;
class y extends w {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = qe(t, this.renderRoot, this.renderOptions);
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
y._$litElement$ = !0, y.finalized = !0, K.litElementHydrateSupport?.({ LitElement: y });
const Le = K.litElementPolyfillSupport;
Le?.({ LitElement: y });
(K.litElementVersions ??= []).push("4.2.2");
const je = { attribute: !0, type: String, converter: N, reflect: !1, hasChanged: W }, Ge = (o = je, e, t) => {
  const { kind: s, metadata: r } = t;
  let n = globalThis.litPropertyMetadata.get(r);
  if (n === void 0 && globalThis.litPropertyMetadata.set(r, n = /* @__PURE__ */ new Map()), s === "setter" && ((o = Object.create(o)).wrapped = !0), n.set(t.name, o), s === "accessor") {
    const { name: i } = t;
    return { set(c) {
      const h = e.get.call(this);
      e.set.call(this, c), this.requestUpdate(i, h, o, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(i, void 0, o, c), c;
    } };
  }
  if (s === "setter") {
    const { name: i } = t;
    return function(c) {
      const h = this[i];
      e.call(this, c), this.requestUpdate(i, h, o, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function J(o) {
  return (e, t) => typeof t == "object" ? Ge(o, e, t) : ((s, r, n) => {
    const i = r.hasOwnProperty(n);
    return r.constructor.createProperty(n, s), i ? Object.getOwnPropertyDescriptor(r, n) : void 0;
  })(o, e, t);
}
function Z(o) {
  return J({ ...o, state: !0, attribute: !1 });
}
function Ve(o) {
  if (o.entities) {
    const e = Object.values(o.entities).filter((t) => t.platform === "github").map((t) => t.entity_id).filter((t) => t in o.states);
    if (e.length > 0) return e;
  }
  return Object.keys(o.states).filter(
    (e) => e.startsWith("github.")
  );
}
const Fe = {
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
}, We = {
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
function Be(o) {
  const e = o.toLowerCase();
  for (const t of Ie)
    if (e.endsWith(`_${t}`))
      return o.slice(0, o.length - t.length - 1) + "_";
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
function Ke(o, e) {
  if (o.entities) {
    const s = o.entities[e];
    if (s?.translation_key) return s.translation_key;
    const r = (s?.unique_id ?? "").toLowerCase();
    for (const n of Object.keys(D))
      if (r.endsWith(`_${n}`) || r === n) return n;
  }
  const t = e.toLowerCase();
  for (const s of Object.keys(D))
    if (t.endsWith(`_${s}`)) return s;
  for (const [s, r] of Object.entries(We))
    if (t.endsWith(`_${s}`)) return r;
  return null;
}
function ge(o, e) {
  if (!o.states[e]) {
    if (console.warn(
      `[ha-github-card] resolveGithubDevice — entity '${e}' not found in hass.states`
    ), console.debug(
      "[ha-github-card] resolveGithubDevice — available states count:",
      Object.keys(o.states).length
    ), console.debug(
      "[ha-github-card] resolveGithubDevice — hass.entities entry:",
      o.entities?.[e]
    ), e.includes("/")) {
      const [a, d] = e.split("/", 2), l = (v) => v.toLowerCase().replace(/[^a-z0-9]/g, "_"), _ = l(a), f = l(d), g = Object.keys(o.states).filter((v) => {
        const k = v.toLowerCase();
        return k.includes(_) && k.includes(f);
      });
      if (console.debug(
        `[ha-github-card] resolveGithubDevice — fuzzy match for '${e}':`,
        g
      ), g.length > 0)
        return console.info(
          `[ha-github-card] resolveGithubDevice — remapped '${e}' → '${g[0]}'`
        ), ge(o, g[0]);
    }
    return null;
  }
  const t = o.states[e].attributes;
  if (console.debug(
    `[ha-github-card] resolveGithubDevice — found '${e}' in hass.states, state='${o.states[e].state}', attrs:`,
    t
  ), t.stargazers_count !== void 0 || t.full_name !== void 0)
    return {
      entity_id: e,
      state: o.states[e].state,
      friendly_name: t.friendly_name ?? e,
      attributes: t,
      slot_icons: {}
    };
  const s = o.entities?.[e], r = s?.device_id ?? null;
  console.debug(
    "[ha-github-card] resolveGithubDevice — new-style path. regEntry:",
    s,
    "| deviceId:",
    r
  );
  const n = r && o.entities ? Object.values(o.entities).filter((a) => a.device_id === r).map((a) => a.entity_id).filter((a) => a in o.states) : (() => {
    const a = Be(e);
    if (console.debug(
      `[ha-github-card] resolveGithubDevice — no device registry, using prefix fallback: '${a}'`
    ), a) {
      const d = Object.keys(o.states).filter(
        (l) => l.toLowerCase().startsWith(a.toLowerCase())
      );
      if (d.length > 1) return d;
    }
    return [e];
  })();
  console.debug(
    "[ha-github-card] resolveGithubDevice — sibling entity IDs:",
    n
  );
  const i = {}, c = {};
  for (const a of n) {
    const d = o.states[a];
    if (!d) continue;
    const l = d.attributes, _ = Ke(o, a);
    if (_ && _ in D) {
      const f = D[_], g = parseFloat(d.state), v = isNaN(g) ? void 0 : g;
      console.debug(
        `[ha-github-card]   ${a} → metricKey='${_}' → attr='${f}' state='${d.state}' value=${v}`
      ), v !== void 0 && (i[f] = v);
      const k = Fe[_];
      k && l.icon && (c[k] = l.icon);
    } else
      console.debug(
        `[ha-github-card]   ${a} → metricKey=${_ ?? "null"} (no SENSOR_ATTR_MAP match) state='${d.state}' attrs:`,
        Object.keys(l)
      );
    if ((a.toLowerCase().includes("commit") || _ === "latest_commit") && (l.sha && (i.latest_commit_sha = l.sha), l.url && (i.latest_commit_url = l.url), l.authored_at && (i.latest_commit_authored_at = l.authored_at), l.message && (i.latest_commit_message = l.message), !i.latest_commit_sha && d.state && d.state !== "unavailable" && (i.latest_commit_sha = d.state), l.icon && (c.last_commit = l.icon)), (a.toLowerCase().includes("release") || a.toLowerCase().includes("_tag") || _ === "latest_tag") && (l.tag && (i.latest_release_tag = l.tag), !i.latest_release_tag && d.state && d.state !== "unavailable" && d.state !== "unknown" && (i.latest_release_tag = d.state)), l.html_url) {
      const f = l.html_url;
      /\/(commit|releases|tree|blob|pull|issues)\//.test(f) || (i.html_url = f);
    }
    if (l.full_name && (i.full_name = l.full_name), l.language && (i.language = l.language), l.owner_avatar && (i.owner_avatar = l.owner_avatar), l.owner_login && (i.owner_login = l.owner_login), l.owner && typeof l.owner == "object") {
      const f = l.owner;
      !i.owner_avatar && f.avatar_url && (i.owner_avatar = f.avatar_url), !i.owner_login && f.login && (i.owner_login = f.login);
    }
  }
  if (!i.owner_avatar && i.full_name) {
    const a = i.full_name.split("/")[0];
    a && (i.owner_login = i.owner_login ?? a, i.owner_avatar = `https://avatars.githubusercontent.com/${a}?s=60`);
  }
  console.debug(
    "[ha-github-card] resolveGithubDevice — combined attrs:",
    JSON.stringify(i)
  ), console.debug(
    "[ha-github-card] resolveGithubDevice — slot_icons:",
    c
  );
  let h;
  if (r && o.devices?.[r]) {
    const a = o.devices[r];
    h = a.name_by_user ?? a.name ?? e, !i.html_url && a.configuration_url && (i.html_url = a.configuration_url), !i.full_name && a.name && (i.full_name = a.name);
  } else
    h = (t.friendly_name ?? e).replace(
      /\s+(Stargazers.*|Forks.*|Watchers.*|Issues.*|Pull Requests.*|Commits?.*|Releases?.*)$/i,
      ""
    ).trim() || e;
  if (i.latest_release_tag && i.html_url) {
    const a = i.html_url.replace(/\/$/, "");
    i.latest_release_url = `${a}/releases/tag/${encodeURIComponent(i.latest_release_tag)}`;
  }
  return {
    entity_id: e,
    state: o.states[e].state,
    friendly_name: h,
    attributes: i,
    slot_icons: c
  };
}
function Je(o) {
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
function S(o) {
  return o == null ? "—" : o >= 1e6 ? `${(o / 1e6).toFixed(1)}M` : o >= 1e3 ? `${(o / 1e3).toFixed(1)}k` : String(o);
}
var Ze = Object.defineProperty, me = (o, e, t, s) => {
  for (var r = void 0, n = o.length - 1, i; n >= 0; n--)
    (i = o[n]) && (r = i(e, t, r) || r);
  return r && Ze(e, t, r), r;
};
const R = [
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
}, X = class ve extends y {
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
      rows: [
        ["watchers", "stars", "last_commit"],
        ["pull_requests", "issues"]
      ]
    };
  }
  setConfig(e) {
    if (!e.entities || !Array.isArray(e.entities))
      throw new Error('ha-github-card: "entities" must be an array');
    const t = e.entities.filter(
      (r) => typeof r == "string" && r.trim() !== ""
    );
    let s = e.rows;
    !s?.length && (e.row2_slots || e.row3_slots) && (s = [
      e.row2_slots ?? R[0],
      e.row3_slots ?? R[1]
    ]), this._config = {
      ...ve.getStubConfig(),
      ...e,
      entities: t,
      rows: s ?? R
    };
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
    console.debug(
      "[ha-github-card] card.render — configured entity IDs:",
      e
    ), console.debug(
      "[ha-github-card] card.render — hass.states keys (sample):",
      Object.keys(this.hass.states).slice(0, 20)
    );
    const t = e.map((s) => {
      const r = ge(this.hass, s);
      return console.debug(
        `[ha-github-card] card.render — resolveGithubDevice('${s}') =>`,
        r
      ), r;
    }).filter((s) => s !== null);
    return console.debug(
      "[ha-github-card] card.render — resolved entities:",
      t.length,
      t.map((s) => s.entity_id)
    ), u`
      <ha-card>
        ${this._renderCardHeader()}
        <div class="card-content ${this._config.compact ? "compact" : ""}">
          ${t.length === 0 ? u`<div class="empty">No GitHub entities configured.</div>` : t.map((s) => this._renderEntity(s))}
        </div>
      </ha-card>
    `;
  }
  _renderCardHeader() {
    if (this._config.show_header === !1) return p;
    const e = this._config.title;
    return e ? u`
      <div class="card-header">
        ${this._config.show_header_icon !== !1 ? u`<div class="header-icon">
              <ha-icon class="icon-header" .icon="${"mdi:github"}"></ha-icon>
            </div>` : p}
        <span class="header-title">${e}</span>
      </div>
    ` : p;
  }
  _getRows() {
    return this._config.rows?.length ? this._config.rows : [
      this._config.row2_slots ?? R[0],
      this._config.row3_slots ?? R[1]
    ];
  }
  _renderEntity(e) {
    const t = e.attributes, s = this._getRows();
    return u`
      <div class="entity-card">
        <!-- Row 1: name (fixed left) + version (fixed right) -->
        <div class="entity-header">
          <div class="header-name">
            ${this._config.show_avatar && t.owner_avatar ? u`<img
                  class="avatar"
                  src="${t.owner_avatar}"
                  alt="${t.owner_login}"
                />` : p}
            <a
              class="repo-name"
              href="${t.html_url ?? "#"}"
              target="_blank"
              rel="noopener noreferrer"
              >${t.full_name ?? e.entity_id}</a
            >
          </div>
          <div class="header-version">
            ${t.latest_release_tag ? u`<a
                  class="version-link"
                  href="${t.latest_release_url ?? "#"}"
                  target="_blank"
                  rel="noopener noreferrer"
                  >${t.latest_release_tag}</a
                >` : u`<span class="version-none">no release</span>`}
          </div>
        </div>

        <!-- Configurable rows -->
        ${s.map((r) => r.length > 0 ? u`
                <div
                  class="entity-row"
                  style="grid-template-columns: repeat(${r.length}, 1fr)"
                >
                  ${r.map(
      (n) => u`
                      <div class="slot-cell" style="${this._slotColor(n, e)}">
                        ${this._renderSlot(n, e)}
                      </div>
                    `
    )}
                </div>
              ` : p)}
      </div>
    `;
  }
  _slotColor(e, t) {
    const s = this._config.slot_colors?.[e];
    if (!s?.length) return "";
    const r = t.attributes, i = {
      stars: r.stargazers_count,
      forks: r.forks_count,
      watchers: r.watchers_count,
      issues: r.open_issues_count,
      pull_requests: r.open_pull_requests_count
    }[e];
    if (i === void 0) return "";
    for (const c of s)
      if (c.op === ">" ? i > c.value : c.op === ">=" ? i >= c.value : c.op === "<" ? i < c.value : c.op === "<=" ? i <= c.value : i === c.value) return c.type === "background" ? `background-color: ${c.color}; border-radius: 4px; padding: 0 4px;` : `color: ${c.color};`;
    return "";
  }
  _slotIcon(e, t) {
    const s = this._config.icons?.[e], r = t.slot_icons[e], n = s ?? r ?? Xe[e] ?? "mdi:help-circle-outline";
    return u`<ha-icon class="icon-sm" .icon="${n}"></ha-icon>`;
  }
  _renderSlot(e, t) {
    const s = t.attributes;
    switch (e) {
      case "stars":
        return u`
          ${this._slotIcon(e, t)}
          <span class="slot-value">${S(s.stargazers_count)}</span>
          <span class="slot-label">Stars</span>
        `;
      case "forks":
        return u`
          ${this._slotIcon(e, t)}
          <span class="slot-value">${S(s.forks_count)}</span>
          <span class="slot-label">Forks</span>
        `;
      case "watchers":
        return u`
          ${this._slotIcon(e, t)}
          <span class="slot-value">${S(s.watchers_count)}</span>
          <span class="slot-label">Watchers</span>
        `;
      case "issues":
        return u`
          ${this._slotIcon(e, t)}
          <span class="slot-value">${S(s.open_issues_count)}</span>
          <span class="slot-label">Issues</span>
        `;
      case "pull_requests":
        return u`
          ${this._slotIcon(e, t)}
          <span class="slot-value"
            >${S(s.open_pull_requests_count)}</span
          >
          <span class="slot-label">Pull Requests</span>
        `;
      case "last_commit":
        return s.latest_commit_sha ? u`
              ${this._slotIcon(e, t)}
              <a
                class="slot-mono-link"
                href="${s.latest_commit_url ?? "#"}"
                target="_blank"
                rel="noopener noreferrer"
                title="${s.latest_commit_message}"
                >${s.latest_commit_sha.slice(0, 7)}</a
              >
              <span class="slot-label"
                >${Je(s.latest_commit_authored_at)}</span
              >
            ` : u`${this._slotIcon(e, t)}<span class="slot-value"
                >—</span
              >`;
      case "last_release":
        return u`
          ${this._slotIcon(e, t)}
          ${s.latest_release_tag ? u`<a
                class="slot-link"
                href="${s.latest_release_url ?? "#"}"
                target="_blank"
                rel="noopener noreferrer"
                >${s.latest_release_tag}</a
              >` : u`<span class="slot-value">—</span>`}
        `;
      default:
        return u``;
    }
  }
  // ------------------------------------------------------------------
  // Styles
  // ------------------------------------------------------------------
  static styles = de`
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

    .header-title {
      flex: 1;
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
var Ye = Object.defineProperty, Q = (o, e, t, s) => {
  for (var r = void 0, n = o.length - 1, i; n >= 0; n--)
    (i = o[n]) && (r = i(e, t, r) || r);
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
class j extends y {
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
    s.includes(t) || this._fireConfigChanged({
      ...this._config,
      entities: [...s, t]
    }), this._pickerValue = "";
  }
  _addCurrentEntity() {
    const e = this._pickerValue.trim();
    if (console.debug("[ha-github-card] editor._addCurrentEntity —", e), !e) return;
    const t = this._config.entities ?? [];
    t.includes(e) || this._fireConfigChanged({
      ...this._config,
      entities: [...t, e]
    }), this._pickerValue = "";
  }
  _setValue(e, t) {
    this._fireConfigChanged({ ...this._config, [e]: t });
  }
  _setSlotIcon(e, t) {
    const s = { ...this._config.icons ?? {} };
    t.trim() ? s[e] = t.trim() : delete s[e], this._fireConfigChanged({ ...this._config, icons: s });
  }
  _getRows() {
    if (this._config.rows?.length)
      return this._config.rows.map((s) => [...s]);
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
    e.length >= 5 || this._fireConfigChanged({
      ...this._config,
      rows: [...e, ["none"]]
    });
  }
  _removeRow(e) {
    const t = this._getRows();
    this._fireConfigChanged({
      ...this._config,
      rows: t.filter((s, r) => r !== e)
    });
  }
  _addColorRule(e) {
    const t = { ...this._config.slot_colors ?? {} }, s = [...t[e] ?? []];
    s.push({ op: ">=", value: 0, color: "var(--error-color, #f44336)", type: "text" }), t[e] = s, this._fireConfigChanged({ ...this._config, slot_colors: t });
  }
  _removeColorRule(e, t) {
    const s = { ...this._config.slot_colors ?? {} }, r = [...s[e] ?? []].filter((n, i) => i !== t);
    r.length === 0 ? delete s[e] : s[e] = r, this._fireConfigChanged({ ...this._config, slot_colors: s });
  }
  _updateColorRule(e, t, s) {
    const r = { ...this._config.slot_colors ?? {} }, n = [...r[e] ?? []];
    n[t] = { ...n[t], ...s }, r[e] = n, this._fireConfigChanged({ ...this._config, slot_colors: r });
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
    if (console.debug(
      "[ha-github-card] editor.render — hass:",
      !!this.hass,
      "| _config:",
      this._config
    ), !this._config)
      return console.warn(
        "[ha-github-card] editor.render — _config is not set yet, rendering nothing"
      ), p;
    const e = this._config, t = e.entities ?? [], s = this._getRows(), r = this.hass ? Ve(this.hass) : [];
    return console.debug(
      "[ha-github-card] editor.render — githubEntities found:",
      r.length,
      r
    ), console.debug(
      "[ha-github-card] editor — ha-textfield defined:",
      !!customElements.get("ha-textfield"),
      "| ha-entity-picker defined:",
      !!customElements.get("ha-entity-picker")
    ), u`
      <div class="field-group">
        <label class="field-label" for="card-title">Card Title</label>
        <input
          id="card-title"
          type="text"
          class="text-input"
          .value="${e.title ?? ""}"
          @change="${(n) => this._setValue("title", n.target.value)}"
          placeholder="GitHub"
        />
      </div>

      <div class="section-label">GitHub Entities</div>

      ${t.length > 0 ? u`
            <div class="entity-list">
              ${t.map((n) => {
      const i = !!(this.hass && this.hass.states[n]);
      return u`
                  <div class="entity-row ${i ? "" : "entity-warn"}">
                    <span class="entity-id">${n}</span>
                    ${i ? p : u`<span
                          class="warn-icon"
                          title="Entity not found in HA — check ID"
                          >⚠</span
                        >`}
                    <button
                      class="remove-btn"
                      @click="${() => this._removeEntity(n)}"
                      aria-label="Remove"
                    >
                      ✕
                    </button>
                  </div>
                `;
    })}
            </div>
          ` : u`<p class="hint">No entities added yet.</p>`}

      <datalist id="github-entity-list">
        ${r.map((n) => u`<option value="${n}"></option>`)}
      </datalist>
      <div class="add-entity-row">
        <input
          type="text"
          class="text-input entity-input"
          list="github-entity-list"
          placeholder="sensor.myrepo_watchers_count"
          .value="${this._pickerValue}"
          @input="${(n) => {
      this._pickerValue = n.target.value;
    }}"
          @change="${this._entityPicked}"
        />
        <button class="add-btn" @click="${this._addCurrentEntity}">Add</button>
      </div>
      <p class="hint">
        ${r.length > 0 ? u`${r.length} GitHub entities available — pick from
            list or type any entity ID.` : u`No GitHub entities auto-detected. Type the entity ID manually
              (e.g. <em>sensor.owner_repo_watchers_count</em>).`}
      </p>

      <div class="section-label">Rows — ${s.length} / 5</div>

      ${s.map(
      (n, i) => u`
          <div class="row-block">
            <div class="row-block-header">
              <span class="row-block-title">Row ${i + 1}</span>
              <div class="col-count-btns">
                <span class="col-count-label">Cols:</span>
                ${[1, 2, 3].map(
        (c) => u`
                    <button
                      class="col-count-btn ${n.length === c ? "active" : ""}"
                      @click="${() => this._setRowColCount(i, c)}"
                    >
                      ${c}
                    </button>
                  `
      )}
              </div>
              <button
                class="remove-btn row-remove-btn"
                @click="${() => this._removeRow(i)}"
                aria-label="Remove row"
                ?disabled="${s.length <= 1}"
              >
                ✕
              </button>
            </div>
            <div class="slot-row">
              ${n.map(
        (c, h) => this._renderSlotSelect(
          i,
          h,
          c,
          `Col ${h + 1}`
        )
      )}
            </div>
          </div>
        `
    )}
      ${s.length < 5 ? u`
            <button class="add-row-btn" @click="${() => this._addRow()}">
              + Add Row
            </button>
          ` : p}

      <div class="section-label">Conditional Colors</div>
      ${[
      ["stars", "Stars"],
      ["forks", "Forks"],
      ["watchers", "Watchers"],
      ["issues", "Issues"],
      ["pull_requests", "Pull Requests"]
    ].map(([n, i]) => {
      const c = e.slot_colors?.[n] ?? [];
      return u`
          <div class="color-slot-block">
            <div class="color-slot-header">
              <span class="color-slot-label">${i}</span>
              <button class="add-color-btn" @click="${() => this._addColorRule(n)}">+ Rule</button>
            </div>
            ${c.map((h, a) => u`
              <div class="color-rule-row">
                <select
                  class="color-type-select"
                  @change="${(d) => this._updateColorRule(n, a, { type: d.target.value })}"
                >
                  <option value="text" ?selected="${h.type !== "background"}">Text</option>
                  <option value="background" ?selected="${h.type === "background"}">BG</option>
                </select>
                <select
                  class="color-op-select"
                  @change="${(d) => this._updateColorRule(n, a, { op: d.target.value })}"
                >
                  ${[">", ">=", "<", "<=", "=="].map((d) => u`
                    <option value="${d}" ?selected="${h.op === d}">${d}</option>
                  `)}
                </select>
                <input
                  type="number"
                  class="text-input color-threshold-input"
                  .value="${String(h.value)}"
                  @change="${(d) => this._updateColorRule(n, a, { value: parseFloat(d.target.value) || 0 })}"
                />
                <div class="color-preview" style="background:${h.color}"></div>
                <input
                  type="text"
                  class="text-input color-color-input"
                  .value="${h.color}"
                  placeholder="#f44336"
                  @change="${(d) => this._updateColorRule(n, a, { color: d.target.value })}"
                />
                <button class="remove-btn" @click="${() => this._removeColorRule(n, a)}">✕</button>
              </div>
            `)}
          </div>
        `;
    })}

      <div class="section-label">Visual Options</div>
      <label class="toggle-row">
        <input
          type="checkbox"
          .checked="${e.show_header !== !1}"
          @change="${(n) => this._setValue(
      "show_header",
      n.target.checked
    )}"
        />
        Show Card Header (title bar)
      </label>
      <label class="toggle-row">
        <input
          type="checkbox"
          .checked="${e.show_header_icon !== !1}"
          @change="${(n) => this._setValue(
      "show_header_icon",
      n.target.checked
    )}"
        />
        Show GitHub Icon in Header
      </label>
      <label class="toggle-row">
        <input
          type="checkbox"
          .checked="${e.show_avatar !== !1}"
          @change="${(n) => this._setValue(
      "show_avatar",
      n.target.checked
    )}"
        />
        Show Owner Avatar
      </label>
      <label class="toggle-row">
        <input
          type="checkbox"
          .checked="${!!e.compact}"
          @change="${(n) => this._setValue("compact", n.target.checked)}"
        />
        Compact Layout
      </label>
    `;
  }
  _renderSlotSelect(e, t, s, r) {
    const n = this._config.icons?.[s] ?? "";
    return u`
      <div class="slot-select-wrap">
        <span class="slot-col-label">${r}</span>
        <select
          @change="${(i) => this._setRowSlot(
      e,
      t,
      i.target.value
    )}"
        >
          ${et.map(
      ([i, c]) => u`
              <option value="${i}" ?selected="${i === s}">
                ${c}
              </option>
            `
    )}
        </select>
        ${s !== "none" ? u`
              <div class="icon-override-row">
                ${n ? u`<ha-icon
                      class="icon-preview"
                      .icon="${n}"
                    ></ha-icon>` : u`<span class="icon-preview-placeholder"
                      >&#xFFFD;</span
                    >`}
                <input
                  type="text"
                  class="text-input icon-input"
                  placeholder="mdi:star"
                  .value="${n}"
                  title="Override icon (leave empty to use sensor default)"
                  @change="${(i) => this._setSlotIcon(
      s,
      i.target.value
    )}"
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
      background: color-mix(in srgb, var(--primary-color, #0366d6) 6%, transparent);
      color: var(--primary-color, #0366d6);
      font-size: 0.78rem;
      font-weight: 600;
      cursor: pointer;
      font-family: inherit;
    }
    .add-color-btn:hover {
      background: color-mix(in srgb, var(--primary-color, #0366d6) 14%, transparent);
    }
    .color-rule-row {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 4px 8px;
      border: 1px solid var(--divider-color, #e1e4e8);
      border-radius: 6px;
      background: color-mix(in srgb, var(--primary-text-color, #000) 2%, transparent);
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
