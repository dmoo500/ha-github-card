// node_modules/@lit/reactive-element/css-tag.js
var e = globalThis, t = e.ShadowRoot && (e.ShadyCSS === void 0 || e.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, n = Symbol(), r = /* @__PURE__ */ new WeakMap(), i = class {
	constructor(e, t, r) {
		if (this._$cssResult$ = !0, r !== n) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
		this.cssText = e, this.t = t;
	}
	get styleSheet() {
		let e = this.o, n = this.t;
		if (t && e === void 0) {
			let t = n !== void 0 && n.length === 1;
			t && (e = r.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), t && r.set(n, e));
		}
		return e;
	}
	toString() {
		return this.cssText;
	}
}, a = (e) => new i(typeof e == "string" ? e : e + "", void 0, n), o = (e, ...t) => new i(e.length === 1 ? e[0] : t.reduce((t, n, r) => t + ((e) => {
	if (!0 === e._$cssResult$) return e.cssText;
	if (typeof e == "number") return e;
	throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
})(n) + e[r + 1], e[0]), e, n), s = (n, r) => {
	if (t) n.adoptedStyleSheets = r.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
	else for (let t of r) {
		let r = document.createElement("style"), i = e.litNonce;
		i !== void 0 && r.setAttribute("nonce", i), r.textContent = t.cssText, n.appendChild(r);
	}
}, c = t ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
	let t = "";
	for (let n of e.cssRules) t += n.cssText;
	return a(t);
})(e) : e, { is: l, defineProperty: u, getOwnPropertyDescriptor: d, getOwnPropertyNames: ee, getOwnPropertySymbols: te, getPrototypeOf: ne } = Object, f = globalThis, re = f.trustedTypes, ie = re ? re.emptyScript : "", ae = f.reactiveElementPolyfillSupport, p = (e, t) => e, m = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? ie : null;
				break;
			case Object:
			case Array: e = e == null ? e : JSON.stringify(e);
		}
		return e;
	},
	fromAttribute(e, t) {
		let n = e;
		switch (t) {
			case Boolean:
				n = e !== null;
				break;
			case Number:
				n = e === null ? null : Number(e);
				break;
			case Object:
			case Array: try {
				n = JSON.parse(e);
			} catch {
				n = null;
			}
		}
		return n;
	}
}, oe = (e, t) => !l(e, t), se = {
	attribute: !0,
	type: String,
	converter: m,
	reflect: !1,
	useDefault: !1,
	hasChanged: oe
};
Symbol.metadata ??= Symbol("metadata"), f.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var h = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = se) {
		if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
			let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
			r !== void 0 && u(this.prototype, e, r);
		}
	}
	static getPropertyDescriptor(e, t, n) {
		let { get: r, set: i } = d(this.prototype, e) ?? {
			get() {
				return this[t];
			},
			set(e) {
				this[t] = e;
			}
		};
		return {
			get: r,
			set(t) {
				let a = r?.call(this);
				i?.call(this, t), this.requestUpdate(e, a, n);
			},
			configurable: !0,
			enumerable: !0
		};
	}
	static getPropertyOptions(e) {
		return this.elementProperties.get(e) ?? se;
	}
	static _$Ei() {
		if (this.hasOwnProperty(p("elementProperties"))) return;
		let e = ne(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(p("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(p("properties"))) {
			let e = this.properties, t = [...ee(e), ...te(e)];
			for (let n of t) this.createProperty(n, e[n]);
		}
		let e = this[Symbol.metadata];
		if (e !== null) {
			let t = litPropertyMetadata.get(e);
			if (t !== void 0) for (let [e, n] of t) this.elementProperties.set(e, n);
		}
		this._$Eh = /* @__PURE__ */ new Map();
		for (let [e, t] of this.elementProperties) {
			let n = this._$Eu(e, t);
			n !== void 0 && this._$Eh.set(n, e);
		}
		this.elementStyles = this.finalizeStyles(this.styles);
	}
	static finalizeStyles(e) {
		let t = [];
		if (Array.isArray(e)) {
			let n = new Set(e.flat(1 / 0).reverse());
			for (let e of n) t.unshift(c(e));
		} else e !== void 0 && t.push(c(e));
		return t;
	}
	static _$Eu(e, t) {
		let n = t.attribute;
		return !1 === n ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
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
		let e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
		for (let n of t.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
		e.size > 0 && (this._$Ep = e);
	}
	createRenderRoot() {
		let e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
		return s(e, this.constructor.elementStyles), e;
	}
	connectedCallback() {
		this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
	}
	enableUpdating(e) {}
	disconnectedCallback() {
		this._$EO?.forEach((e) => e.hostDisconnected?.());
	}
	attributeChangedCallback(e, t, n) {
		this._$AK(e, n);
	}
	_$ET(e, t) {
		let n = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, n);
		if (r !== void 0 && !0 === n.reflect) {
			let i = (n.converter?.toAttribute === void 0 ? m : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? m : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? oe)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
			this.C(e, t, n);
		}
		!1 === this.isUpdatePending && (this._$ES = this._$EP());
	}
	C(e, t, { useDefault: n, reflect: r, wrapped: i }, a) {
		n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), !0 !== i || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)), !0 === r && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
	}
	async _$EP() {
		this.isUpdatePending = !0;
		try {
			await this._$ES;
		} catch (e) {
			Promise.reject(e);
		}
		let e = this.scheduleUpdate();
		return e != null && await e, !this.isUpdatePending;
	}
	scheduleUpdate() {
		return this.performUpdate();
	}
	performUpdate() {
		if (!this.isUpdatePending) return;
		if (!this.hasUpdated) {
			if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
				for (let [e, t] of this._$Ep) this[e] = t;
				this._$Ep = void 0;
			}
			let e = this.constructor.elementProperties;
			if (e.size > 0) for (let [t, n] of e) {
				let { wrapped: e } = n, r = this[t];
				!0 !== e || this._$AL.has(t) || r === void 0 || this.C(t, void 0, n, r);
			}
		}
		let e = !1, t = this._$AL;
		try {
			e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((e) => e.hostUpdate?.()), this.update(t)) : this._$EM();
		} catch (t) {
			throw e = !1, this._$EM(), t;
		}
		e && this._$AE(t);
	}
	willUpdate(e) {}
	_$AE(e) {
		this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
		this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
	}
	updated(e) {}
	firstUpdated(e) {}
};
h.elementStyles = [], h.shadowRootOptions = { mode: "open" }, h[p("elementProperties")] = /* @__PURE__ */ new Map(), h[p("finalized")] = /* @__PURE__ */ new Map(), ae?.({ ReactiveElement: h }), (f.reactiveElementVersions ??= []).push("2.1.2");
// node_modules/lit-html/lit-html.js
var g = globalThis, ce = (e) => e, _ = g.trustedTypes, le = _ ? _.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ue = "$lit$", v = `lit$${Math.random().toFixed(9).slice(2)}$`, de = "?" + v, fe = `<${de}>`, y = document, b = () => y.createComment(""), x = (e) => e === null || typeof e != "object" && typeof e != "function", pe = Array.isArray, me = (e) => pe(e) || typeof e?.[Symbol.iterator] == "function", he = "[ 	\n\f\r]", S = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ge = /-->/g, _e = />/g, C = RegExp(`>|${he}(?:([^\\s"'>=/]+)(${he}*=${he}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), ve = /'/g, ye = /"/g, be = /^(?:script|style|textarea|title)$/i, xe = (e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}), w = xe(1), T = xe(2), E = Symbol.for("lit-noChange"), D = Symbol.for("lit-nothing"), Se = /* @__PURE__ */ new WeakMap(), O = y.createTreeWalker(y, 129);
function Ce(e, t) {
	if (!pe(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return le === void 0 ? t : le.createHTML(t);
}
var we = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = S;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === S ? c[1] === "!--" ? o = ge : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = C) : (be.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = C) : o = _e : o === C ? c[0] === ">" ? (o = i ?? S, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? C : c[3] === "\"" ? ye : ve) : o === ye || o === ve ? o = C : o === ge || o === _e ? o = S : (o = C, i = void 0);
		let d = o === C && e[t + 1].startsWith("/>") ? " " : "";
		a += o === S ? n + fe : l >= 0 ? (r.push(s), n.slice(0, l) + ue + n.slice(l) + v + d) : n + v + (l === -2 ? t : d);
	}
	return [Ce(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, k = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = we(t, n);
		if (this.el = e.createElement(l, r), O.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = O.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(ue)) {
					let t = u[o++], n = i.getAttribute(e).split(v), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? Ee : r[1] === "?" ? De : r[1] === "@" ? Oe : M
					}), i.removeAttribute(e);
				} else e.startsWith(v) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (be.test(i.tagName)) {
					let e = i.textContent.split(v), t = e.length - 1;
					if (t > 0) {
						i.textContent = _ ? _.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], b()), O.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], b());
					}
				}
			} else if (i.nodeType === 8) {
				if (i.data === de) c.push({
					type: 2,
					index: a
				});
				else {
					let e = -1;
					for (; (e = i.data.indexOf(v, e + 1)) !== -1;) c.push({
						type: 7,
						index: a
					}), e += v.length - 1;
				}
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = y.createElement("template");
		return n.innerHTML = e, n;
	}
};
function A(e, t, n = e, r) {
	if (t === E) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = x(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = A(e, i._$AS(e, t.values), i, r)), t;
}
var Te = class {
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
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? y).importNode(t, !0);
		O.currentNode = r;
		let i = O.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new j(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new ke(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = O.nextNode(), a++);
		}
		return O.currentNode = y, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, j = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = D, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
	}
	get parentNode() {
		let e = this._$AA.parentNode, t = this._$AM;
		return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
	}
	get startNode() {
		return this._$AA;
	}
	get endNode() {
		return this._$AB;
	}
	_$AI(e, t = this) {
		e = A(this, e, t), x(e) ? e === D || e == null || e === "" ? (this._$AH !== D && this._$AR(), this._$AH = D) : e !== this._$AH && e !== E && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? me(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== D && x(this._$AH) ? this._$AA.nextSibling.data = e : this.T(y.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = k.createElement(Ce(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new Te(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = Se.get(e.strings);
		return t === void 0 && Se.set(e.strings, t = new k(e)), t;
	}
	k(t) {
		pe(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(b()), this.O(b()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = ce(e).nextSibling;
			ce(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, M = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = D, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = D;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = A(this, e, t, 0), a = !x(e) || e !== this._$AH && e !== E, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = A(this, r[n + o], t, o), s === E && (s = this._$AH[o]), a ||= !x(s) || s !== this._$AH[o], s === D ? e = D : e !== D && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === D ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, Ee = class extends M {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === D ? void 0 : e;
	}
}, De = class extends M {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== D);
	}
}, Oe = class extends M {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = A(this, e, t, 0) ?? D) === E) return;
		let n = this._$AH, r = e === D && n !== D || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== D && (n === D || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, ke = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		A(this, e);
	}
}, Ae = g.litHtmlPolyfillSupport;
Ae?.(k, j), (g.litHtmlVersions ??= []).push("3.3.2");
var je = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new j(t.insertBefore(b(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, N = globalThis, P = class extends h {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = je(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return E;
	}
};
P._$litElement$ = !0, P.finalized = !0, N.litElementHydrateSupport?.({ LitElement: P });
var Me = N.litElementPolyfillSupport;
Me?.({ LitElement: P }), (N.litElementVersions ??= []).push("4.2.2");
// node_modules/@lit/reactive-element/decorators/property.js
var Ne = {
	attribute: !0,
	type: String,
	converter: m,
	reflect: !1,
	hasChanged: oe
}, Pe = (e = Ne, t, n) => {
	let { kind: r, metadata: i } = n, a = globalThis.litPropertyMetadata.get(i);
	if (a === void 0 && globalThis.litPropertyMetadata.set(i, a = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(n.name, e), r === "accessor") {
		let { name: r } = n;
		return {
			set(n) {
				let i = t.get.call(this);
				t.set.call(this, n), this.requestUpdate(r, i, e, !0, n);
			},
			init(t) {
				return t !== void 0 && this.C(r, void 0, e, t), t;
			}
		};
	}
	if (r === "setter") {
		let { name: r } = n;
		return function(n) {
			let i = this[r];
			t.call(this, n), this.requestUpdate(r, i, e, !0, n);
		};
	}
	throw Error("Unsupported decorator location: " + r);
};
function F(e) {
	return (t, n) => typeof n == "object" ? Pe(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
// node_modules/@lit/reactive-element/decorators/state.js
function I(e) {
	return F({
		...e,
		state: !0,
		attribute: !1
	});
}
// src/utils/activity.ts
var L = {
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
}, R = Object.keys(L), Fe = [
	"commits",
	"pull_requests",
	"issues"
], z = { "7d": {
	label: "Last 7 days",
	days: 7
} }, Ie = Object.keys(z), B = {
	line: { label: "Line" },
	bar: { label: "Stacked bars" }
}, Le = Object.keys(B), Re = "line";
function ze(e) {
	let t = e.activity_range && e.activity_range in z ? e.activity_range : "7d", n = R.filter((t) => e.activity_metrics?.includes(t)), r = e.activity_chart_type && e.activity_chart_type in B ? e.activity_chart_type : Re;
	return {
		range: t,
		metrics: n.length > 0 ? n : [...Fe],
		chartType: r
	};
}
function Be({ entityId: e, translationKey: t, uniqueId: n }) {
	let r = [
		(e) => t === e,
		(e) => {
			let t = (n ?? "").toLowerCase();
			return t === e || t.endsWith(`_${e}`);
		},
		(t) => e.toLowerCase().endsWith(`_${t}`)
	];
	for (let e of r) for (let t of R) if (e(L[t].translationKey)) return t;
	return null;
}
function Ve(e) {
	return new Date(e.getFullYear(), e.getMonth(), e.getDate());
}
function He(e, t) {
	return new Date(e.getFullYear(), e.getMonth(), e.getDate() + t);
}
function V(e) {
	let t = String(e.getMonth() + 1).padStart(2, "0"), n = String(e.getDate()).padStart(2, "0");
	return `${e.getFullYear()}-${t}-${n}`;
}
function Ue(e, t) {
	let { days: n } = z[e], r = Ve(t);
	return Array.from({ length: n }, (e, t) => He(r, t - (n - 1)));
}
var We = /* @__PURE__ */ new Set(["unavailable", ""]), Ge = "unknown";
function Ke(e, t, n = -Infinity) {
	let r = [...e].sort((e, t) => e.lu - t.lu), i = /* @__PURE__ */ new Set(), a = -Infinity, o = !1, s = [];
	for (let e of r) {
		if (We.has(e.s)) continue;
		if (e.s === Ge) {
			o = !0;
			continue;
		}
		let r = e.a?.[t.identityAttribute], c = r == null ? e.s : String(r), l = r == null ? NaN : Number(r), u = t.identityMode === "increasing" && Number.isFinite(l) ? l > a : !i.has(c), d = e.lu * 1e3;
		o && u && d >= n && s.push(d), o = !0, i.add(c), Number.isFinite(l) && (a = Math.max(a, l));
	}
	return s;
}
var qe = 100, Je = class {
	constructor() {
		this._entries = /* @__PURE__ */ new Map();
	}
	observe(e, t) {
		let n = !1;
		for (let r of t) {
			let t = e[r];
			if (!t) continue;
			let i = Date.parse(t.last_updated) / 1e3;
			if (!Number.isFinite(i)) continue;
			let a = this._entries.get(r) ?? [];
			a.length > 0 && a[a.length - 1].lu >= i || (a.push({
				s: t.state,
				a: t.attributes,
				lu: i
			}), a.length > qe && a.shift(), this._entries.set(r, a), n = !0);
		}
		return n;
	}
	prune(e) {
		for (let [t, n] of this._entries) {
			let r = H(e[t] ?? []), i = n.filter((e, t) => e.lu > r || t === n.length - 1);
			this._entries.set(t, i);
		}
	}
	entries() {
		return Object.fromEntries(this._entries);
	}
};
function H(e) {
	return e.reduce((e, t) => Math.max(e, t.lu), -Infinity);
}
function Ye(e, t, n) {
	return n.some((n) => {
		let r = Date.parse(t[n]?.last_updated ?? "") / 1e3;
		return Number.isFinite(r) && r > H(e[n] ?? []);
	});
}
function Xe(e, t) {
	let n = { ...e };
	for (let [e, r] of Object.entries(t)) {
		let t = n[e] ?? [], i = H(t), a = r.filter((e) => e.lu > i);
		a.length > 0 && (n[e] = [...t, ...a]);
	}
	return n;
}
function Ze(e, t, n, r, i) {
	let a = Ve(i).getTime(), o = Ue(r, i).map((e) => ({
		date: e,
		counts: Object.fromEntries(R.map((e) => [e, 0])),
		total: 0,
		inProgress: e.getTime() >= a
	})), s = new Map(o.map((e, t) => [V(e.date), t]));
	for (let r of n) {
		let n = t[r];
		if (!n) continue;
		let i = Ke(e[n] ?? [], L[r], o[0].date.getTime());
		for (let e of i) {
			let t = s.get(V(new Date(e)));
			t !== void 0 && (o[t].counts[r] += 1, o[t].total += 1);
		}
	}
	return o;
}
var U = /* @__PURE__ */ new Map();
function Qe(e, t, n, r) {
	let i = [...t].sort().map((t) => `${t}@${e.states[t]?.last_updated ?? ""}`);
	return [
		n,
		V(r),
		...i
	].join("|");
}
function $e(e, t, n, r) {
	let i = Qe(e, t, n, r), a = U.get(i);
	if (a) return a;
	let [o] = Ue(n, r), s = new Date(o);
	s.setDate(s.getDate() - 1);
	let c = e.callWS({
		type: "history/history_during_period",
		start_time: s.toISOString(),
		entity_ids: t,
		include_start_time_state: !0,
		significant_changes_only: !1,
		minimal_response: !1,
		no_attributes: !1
	}).finally(() => {
		U.delete(i);
	});
	return U.set(i, c), c;
}
// src/utils/github.ts
function et(e) {
	if (e.entities) {
		let t = Object.values(e.entities).filter((e) => e.platform === "github").map((e) => e.entity_id).filter((t) => t in e.states);
		if (t.length > 0) return t;
	}
	return Object.keys(e.states).filter((e) => e.startsWith("github."));
}
var tt = {
	stargazers_count: "stars",
	subscribers_count: "watchers",
	forks_count: "forks",
	issues_count: "issues",
	pulls_count: "pull_requests",
	latest_commit: "last_commit",
	newest_release: "last_release",
	latest_tag: "last_release",
	watchers_count: "watchers",
	open_issues_count: "issues",
	open_pull_requests_count: "pull_requests",
	forks: "forks",
	watchers: "watchers",
	issues: "issues",
	pull_requests: "pull_requests",
	open_pull_requests: "pull_requests",
	stars: "stars"
}, nt = {
	forks: "forks_count",
	watchers: "watchers_count",
	issues: "open_issues_count",
	open_issues: "open_issues_count",
	pull_requests: "open_pull_requests_count",
	open_pull_requests: "open_pull_requests_count",
	stars: "stargazers_count",
	stargazers: "stargazers_count"
}, rt = [
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
function it(e) {
	let t = e.toLowerCase();
	for (let n of rt) if (t.endsWith(`_${n}`)) return e.slice(0, e.length - n.length - 1) + "_";
	return null;
}
var W = {
	stargazers_count: "stargazers_count",
	subscribers_count: "watchers_count",
	forks_count: "forks_count",
	issues_count: "open_issues_count",
	pulls_count: "open_pull_requests_count",
	open_issues_count: "open_issues_count",
	open_pull_requests_count: "open_pull_requests_count",
	watchers_count: "watchers_count"
};
function at(e, t) {
	if (e.entities) {
		let n = e.entities[t];
		if (n?.translation_key) return n.translation_key;
		let r = (n?.unique_id ?? "").toLowerCase();
		for (let e of Object.keys(W)) if (r.endsWith(`_${e}`) || r === e) return e;
	}
	let n = t.toLowerCase();
	for (let e of Object.keys(W)) if (n.endsWith(`_${e}`)) return e;
	for (let [e, t] of Object.entries(nt)) if (n.endsWith(`_${e}`)) return t;
	return null;
}
function ot(e, t) {
	if (!e.states[t]) {
		if (console.warn(`[ha-github-card] resolveGithubDevice — entity '${t}' not found in hass.states`), t.includes("/")) {
			let [n, r] = t.split("/", 2), i = (e) => e.toLowerCase().replace(/[^a-z0-9]/g, "_"), a = i(n), o = i(r), s = Object.keys(e.states).filter((e) => {
				let t = e.toLowerCase();
				return t.includes(a) && t.includes(o);
			});
			if (s.length > 0) return console.info(`[ha-github-card] resolveGithubDevice — remapped '${t}' → '${s[0]}'`), ot(e, s[0]);
		}
		return null;
	}
	let n = e.states[t].attributes;
	if (n.stargazers_count !== void 0 || n.full_name !== void 0) return {
		entity_id: t,
		state: e.states[t].state,
		friendly_name: n.friendly_name ?? t,
		attributes: n,
		slot_icons: {},
		activity_sources: {}
	};
	let r = e.entities?.[t]?.device_id ?? null, i = r && e.entities ? Object.values(e.entities).filter((e) => e.device_id === r).map((e) => e.entity_id).filter((t) => t in e.states) : (() => {
		let n = it(t);
		if (n) {
			let t = Object.keys(e.states).filter((e) => e.toLowerCase().startsWith(n.toLowerCase()));
			if (t.length > 1) return t;
		}
		return [t];
	})(), a = {}, o = {}, s = {};
	for (let t of i) {
		let n = e.states[t];
		if (!n) continue;
		let r = n.attributes, i = e.entities?.[t], c = Be({
			entityId: t,
			translationKey: i?.translation_key,
			uniqueId: i?.unique_id
		});
		c && (s[c] = t);
		let l = at(e, t);
		if (l && l in W) {
			let e = W[l], t = parseFloat(n.state), i = isNaN(t) ? void 0 : t;
			i !== void 0 && (a[e] = i);
			let s = tt[l];
			s && r.icon && (o[s] = r.icon);
		}
		if ((t.toLowerCase().includes("commit") || l === "latest_commit") && (r.sha && (a.latest_commit_sha = r.sha), r.url && (a.latest_commit_url = r.url), r.authored_at && (a.latest_commit_authored_at = r.authored_at), r.message && (a.latest_commit_message = r.message), !a.latest_commit_sha && n.state && n.state !== "unavailable" && (a.latest_commit_sha = n.state), r.icon && (o.last_commit = r.icon)), (t.toLowerCase().includes("release") || t.toLowerCase().includes("_tag") || l === "latest_tag") && (r.tag && (a.latest_release_tag = r.tag), !a.latest_release_tag && n.state && n.state !== "unavailable" && n.state !== "unknown" && (a.latest_release_tag = n.state)), r.html_url) {
			let e = r.html_url;
			/\/(commit|releases|tree|blob|pull|issues)\//.test(e) || (a.html_url = e);
		}
		if (r.full_name && (a.full_name = r.full_name), r.language && (a.language = r.language), r.owner_avatar && (a.owner_avatar = r.owner_avatar), r.owner_login && (a.owner_login = r.owner_login), r.owner && typeof r.owner == "object") {
			let e = r.owner;
			!a.owner_avatar && e.avatar_url && (a.owner_avatar = e.avatar_url), !a.owner_login && e.login && (a.owner_login = e.login);
		}
	}
	let c;
	if (r && e.devices?.[r]) {
		let n = e.devices[r];
		c = n.name_by_user ?? n.name ?? t, !a.html_url && n.configuration_url && (a.html_url = n.configuration_url), !a.full_name && n.name && (a.full_name = n.name);
	} else c = (n.friendly_name ?? t).replace(/\s+(Stargazers.*|Forks.*|Watchers.*|Issues.*|Pull Requests.*|Commits?.*|Releases?.*)$/i, "").trim() || t;
	if (!a.owner_avatar && a.full_name) {
		let e = a.full_name.split("/")[0];
		e && (a.owner_login = a.owner_login ?? e, a.owner_avatar = `https://avatars.githubusercontent.com/${e}?s=60`);
	}
	return a.latest_release_tag && a.html_url && (a.latest_release_url = `${a.html_url.replace(/\/$/, "")}/releases/tag/${encodeURIComponent(a.latest_release_tag)}`), {
		entity_id: t,
		state: e.states[t].state,
		friendly_name: c,
		attributes: a,
		slot_icons: o,
		activity_sources: s
	};
}
function st(e) {
	if (!e) return "—";
	try {
		return new Date(e).toLocaleDateString(void 0, {
			year: "numeric",
			month: "short",
			day: "numeric"
		});
	} catch {
		return e;
	}
}
function G(e) {
	return e == null ? "—" : e >= 1e6 ? `${(e / 1e6).toFixed(1)}M` : e >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(e);
}
// src/components/card-header.ts
function ct(e) {
	return e.show_header === !1 || !e.title ? D : w`
    <div class="card-header">
      ${e.show_header_icon === !1 ? D : w`<div class="header-icon">
              <ha-icon class="icon-header" .icon="${"mdi:github"}"></ha-icon>
            </div>`}
      <span class="header-title">${e.title}</span>
    </div>
  `;
}
var lt = o`
  .card-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 16px 8px;
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--gh-text, var(--primary-text-color, #24292e));
    border-bottom: 1px solid var(--gh-border, var(--divider-color, #e1e4e8));
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
    color: var(--gh-text, var(--primary-text-color, #24292e));
  }
`;
// \0@oxc-project+runtime@0.156.0/helpers/esm/decorateMetadata.js
function K(e, t) {
	if (typeof Reflect == "object" && typeof Reflect.metadata == "function") return Reflect.metadata(e, t);
}
// \0@oxc-project+runtime@0.156.0/helpers/esm/decorate.js
function q(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
// src/github-card.ts
var J = [[
	"watchers",
	"stars",
	"last_commit"
], ["pull_requests", "issues"]], ut = {
	stars: "mdi:star",
	forks: "mdi:source-fork",
	watchers: "mdi:eye",
	issues: "mdi:alert-circle-outline",
	pull_requests: "mdi:source-pull",
	last_commit: "mdi:source-commit",
	last_release: "mdi:tag"
}, Y = class e extends P {
	get hass() {
		return this._hass;
	}
	set hass(e) {
		this._hass = e, this.requestUpdate();
	}
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
			rows: [[
				"watchers",
				"stars",
				"last_commit"
			], ["pull_requests", "issues"]]
		};
	}
	setConfig(t) {
		if (!t.entities || !Array.isArray(t.entities)) throw Error("ha-github-card: \"entities\" must be an array");
		let n = t.entities.filter((e) => typeof e == "string" && e.trim() !== ""), r = t.rows;
		!r?.length && (t.row2_slots || t.row3_slots) && (r = [t.row2_slots ?? J[0], t.row3_slots ?? J[1]]), this._config = {
			...e.getStubConfig(),
			...t,
			entities: n,
			rows: r ?? J
		};
	}
	getCardSize() {
		let e = this._config?.show_activity ? 5 : 3;
		return (this._config?.entities?.length ?? 1) * e + 1;
	}
	render() {
		if (!this._config || !this.hass) return D;
		let e = (this._config.entities ?? []).map((e) => ot(this.hass, e)).filter((e) => e !== null);
		return w`
      <ha-card>
        ${ct(this._config)}
        <div class="card-content ${this._config.compact ? "compact" : ""}">
          ${e.length === 0 ? w`<div class="empty">No GitHub entities configured.</div>` : e.map((e) => this._renderEntity(e))}
        </div>
      </ha-card>
    `;
	}
	_getRows() {
		return this._config.rows?.length ? this._config.rows : [this._config.row2_slots ?? J[0], this._config.row3_slots ?? J[1]];
	}
	_renderEntity(e) {
		let t = e.attributes, n = this._getRows();
		return w`
      <div class="entity-card">
        <!-- Row 1: name (fixed left) + version (fixed right) -->
        <div class="entity-header">
          <div class="header-name">
            ${this._config.show_avatar && t.owner_avatar ? w`<img
                    class="avatar"
                    src="${t.owner_avatar}"
                    alt="${t.owner_login ?? ""}"
                    @error="${(e) => {
			e.target.style.display = "none";
		}}"
                  />` : D}
            <a
              class="repo-name"
              href="${t.html_url ?? "#"}"
              target="_blank"
              rel="noopener noreferrer"
              >${t.full_name ?? e.entity_id}</a
            >
          </div>
          <div class="header-version">
            ${t.latest_release_tag ? w`<a
                    class="version-link"
                    href="${t.latest_release_url ?? "#"}"
                    target="_blank"
                    rel="noopener noreferrer"
                    >${t.latest_release_tag}</a
                  >` : w`<span class="version-none">no release</span>`}
          </div>
        </div>

        <!-- Configurable rows -->
        ${n.map((t) => t.length > 0 ? w`
                <div
                  class="entity-row"
                  style="grid-template-columns: repeat(${t.length}, 1fr)"
                >
                  ${t.map((t) => {
			let n = this._matchSlotRule(t, e), r = n?.type === "background" ? `background-color: ${n.color}; border-radius: 4px; padding: 0 4px;` : "", i = n && n.type !== "background" ? n.color : "";
			return w`
                      <div class="slot-cell" style="${r}">
                        ${this._renderSlot(t, e, i)}
                      </div>
                    `;
		})}
                </div>
              ` : D)}
        ${this._config.show_activity ? w`<ha-github-activity-chart
                class="entity-activity"
                .hass="${this.hass}"
                .sources="${e.activity_sources}"
                .options="${this._config}"
              ></ha-github-activity-chart>` : D}
      </div>
    `;
	}
	_matchSlotRule(e, t) {
		let n = this._config.slot_colors?.[e];
		if (!n?.length) return null;
		let r = t.attributes, i = {
			stars: r.stargazers_count,
			forks: r.forks_count,
			watchers: r.watchers_count,
			issues: r.open_issues_count,
			pull_requests: r.open_pull_requests_count
		}[e];
		if (i === void 0) return null;
		for (let e of n) {
			let t = Number(e.value);
			if (e.op === ">" ? i > t : e.op === ">=" ? i >= t : e.op === "<" ? i < t : e.op === "<=" ? i <= t : i === t) return e;
		}
		return null;
	}
	_slotIcon(e, t) {
		let n = this._config.icons?.[e], r = t.slot_icons[e];
		return w`<ha-icon class="icon-sm" .icon="${n ?? r ?? ut[e] ?? "mdi:help-circle-outline"}"></ha-icon>`;
	}
	_renderSlot(e, t, n = "") {
		let r = t.attributes, i = n ? `color: ${n};` : "";
		switch (e) {
			case "stars": return w`
          ${this._slotIcon(e, t)}
          <span class="slot-value" style="${i}"
            >${G(r.stargazers_count)}</span
          >
          <span class="slot-label" style="${i}">Stars</span>
        `;
			case "forks": return w`
          ${this._slotIcon(e, t)}
          <span class="slot-value" style="${i}"
            >${G(r.forks_count)}</span
          >
          <span class="slot-label" style="${i}">Forks</span>
        `;
			case "watchers": return w`
          ${this._slotIcon(e, t)}
          <span class="slot-value" style="${i}"
            >${G(r.watchers_count)}</span
          >
          <span class="slot-label" style="${i}">Watchers</span>
        `;
			case "issues": return w`
          ${this._slotIcon(e, t)}
          <span class="slot-value" style="${i}"
            >${G(r.open_issues_count)}</span
          >
          <span class="slot-label" style="${i}">Issues</span>
        `;
			case "pull_requests": return w`
          ${this._slotIcon(e, t)}
          <span class="slot-value" style="${i}"
            >${G(r.open_pull_requests_count)}</span
          >
          <span class="slot-label" style="${i}">Pull Requests</span>
        `;
			case "last_commit": return r.latest_commit_sha ? w`
              ${this._slotIcon(e, t)}
              <a
                class="slot-mono-link"
                href="${r.latest_commit_url ?? "#"}"
                target="_blank"
                rel="noopener noreferrer"
                title="${r.latest_commit_message}"
                >${r.latest_commit_sha.slice(0, 7)}</a
              >
              <span class="slot-label"
                >${st(r.latest_commit_authored_at)}</span
              >
            ` : w`${this._slotIcon(e, t)}<span class="slot-value"
                >—</span
              >`;
			case "last_release": return w`
          ${this._slotIcon(e, t)}
          ${r.latest_release_tag ? w`<a
                  class="slot-link"
                  href="${r.latest_release_url ?? "#"}"
                  target="_blank"
                  rel="noopener noreferrer"
                  >${r.latest_release_tag}</a
                >` : w`<span class="slot-value">—</span>`}
        `;
			default: return w``;
		}
	}
	static {
		this.styles = [lt, o`
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
    `];
	}
};
q([I(), K("design:type", Object)], Y.prototype, "_config", void 0);
// src/editor/editor-styles.ts
var dt = o`
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
// src/editor/activity-options-editor.ts
function ft(e, t) {
	let { range: n, metrics: r, chartType: i } = ze(e), a = (e, n) => {
		let i = n ? [...r, e] : r.filter((t) => t !== e), a = R.filter((e) => i.includes(e));
		a.length > 0 && t({ activity_metrics: a });
	};
	return w`
    <div class="field-group">
      <label class="field-label" for="activity-range">Time Range</label>
      <select
        id="activity-range"
        @change="${(e) => t({ activity_range: e.target.value })}"
      >
        ${Ie.map((e) => w`
            <option value="${e}" ?selected="${e === n}">
              ${z[e].label}
            </option>
          `)}
      </select>
    </div>
    <div class="field-group">
      <label class="field-label" for="activity-chart-type">Chart Type</label>
      <select
        id="activity-chart-type"
        @change="${(e) => t({ activity_chart_type: e.target.value })}"
      >
        ${Le.map((e) => w`
            <option value="${e}" ?selected="${e === i}">
              ${B[e].label}
            </option>
          `)}
      </select>
    </div>
    <div class="field-group">
      <span class="field-label">Metrics</span>
      <div class="activity-metrics">
        ${R.map((e) => w`
            <label class="toggle-row">
              <input
                type="checkbox"
                .checked="${r.includes(e)}"
                ?disabled="${r.length === 1 && r.includes(e)}"
                @change="${(t) => a(e, t.target.checked)}"
              />
              <span
                class="activity-metric-dot"
                style="background:${L[e].color}"
              ></span>
              ${L[e].label}
            </label>
          `)}
      </div>
    </div>
    <p class="hint">
      Counts new commits, pull requests, issues and discussions per day from the
      recorded history of the repository's "Latest …" sensors. Only activity
      recorded by Home Assistant is shown.
    </p>
  `;
}
var pt = o`
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
`, mt = [
	["watchers", "👁  Watchers"],
	["stars", "⭐ Stars"],
	["forks", "🍴 Forks"],
	["issues", "🐛 Issues"],
	["pull_requests", "🔀 Pull Requests"],
	["last_commit", "🔗 Last Commit"],
	["last_release", "🏷  Latest Release"],
	["none", "— None —"]
], X = class extends P {
	constructor(...e) {
		super(...e), this._config = void 0, this._pickerValue = "";
	}
	setConfig(e) {
		this._config = { ...e }, this.requestUpdate();
	}
	_removeEntity(e) {
		this._fireConfigChanged({
			...this._config,
			entities: (this._config.entities ?? []).filter((t) => t !== e)
		});
	}
	_entityPicked(e) {
		let t = e.detail?.value ?? e.target?.value ?? "";
		if (!t || !t.trim()) {
			this._pickerValue = "";
			return;
		}
		let n = this._config.entities ?? [];
		n.includes(t) || this._fireConfigChanged({
			...this._config,
			entities: [...n, t]
		}), this._pickerValue = "";
	}
	_addCurrentEntity() {
		let e = this._pickerValue.trim();
		if (!e) return;
		let t = this._config.entities ?? [];
		t.includes(e) || this._fireConfigChanged({
			...this._config,
			entities: [...t, e]
		}), this._pickerValue = "";
	}
	_setValue(e, t) {
		this._fireConfigChanged({
			...this._config,
			[e]: t
		});
	}
	_setSlotIcon(e, t) {
		let n = { ...this._config.icons ?? {} };
		t.trim() ? n[e] = t.trim() : delete n[e], this._fireConfigChanged({
			...this._config,
			icons: n
		});
	}
	_getRows() {
		if (this._config.rows?.length) return this._config.rows.map((e) => [...e]);
		let e = this._config.row2_slots ?? [
			"watchers",
			"stars",
			"last_commit"
		], t = this._config.row3_slots ?? ["pull_requests", "issues"];
		return [[...e], [...t]];
	}
	_setRowSlot(e, t, n) {
		let r = this._getRows();
		r[e][t] = n, this._fireConfigChanged({
			...this._config,
			rows: r
		});
	}
	_setRowColCount(e, t) {
		let n = this._getRows(), r = n[e];
		for (; r.length < t;) r.push("none");
		n[e] = r.slice(0, t), this._fireConfigChanged({
			...this._config,
			rows: n
		});
	}
	_addRow() {
		let e = this._getRows();
		e.length >= 5 || this._fireConfigChanged({
			...this._config,
			rows: [...e, ["none"]]
		});
	}
	_removeRow(e) {
		let t = this._getRows();
		this._fireConfigChanged({
			...this._config,
			rows: t.filter((t, n) => n !== e)
		});
	}
	_addColorRule(e) {
		let t = { ...this._config.slot_colors ?? {} }, n = [...t[e] ?? []];
		n.push({
			op: ">=",
			value: 0,
			color: "var(--error-color, #f44336)",
			type: "text"
		}), t[e] = n, this._fireConfigChanged({
			...this._config,
			slot_colors: t
		});
	}
	_removeColorRule(e, t) {
		let n = { ...this._config.slot_colors ?? {} }, r = [...n[e] ?? []].filter((e, n) => n !== t);
		r.length === 0 ? delete n[e] : n[e] = r, this._fireConfigChanged({
			...this._config,
			slot_colors: n
		});
	}
	_updateColorRule(e, t, n) {
		let r = { ...this._config.slot_colors ?? {} }, i = [...r[e] ?? []];
		i[t] = {
			...i[t],
			...n
		}, r[e] = i, this._fireConfigChanged({
			...this._config,
			slot_colors: r
		});
	}
	_fireConfigChanged(e) {
		this._config = e, this.dispatchEvent(new CustomEvent("config-changed", {
			detail: { config: e },
			bubbles: !0,
			composed: !0
		}));
	}
	render() {
		if (!this._config) return D;
		let e = this._config, t = e.entities ?? [], n = this._getRows(), r = this.hass ? et(this.hass) : [];
		return w`
      <div class="field-group">
        <label class="field-label" for="card-title">Card Title</label>
        <input
          id="card-title"
          type="text"
          class="text-input"
          .value="${e.title ?? ""}"
          @change="${(e) => this._setValue("title", e.target.value)}"
          placeholder="GitHub"
        />
      </div>

      <div class="section-label">GitHub Entities</div>

      ${t.length > 0 ? w`
              <div class="entity-list">
                ${t.map((e) => {
			let t = !!(this.hass && this.hass.states[e]), n = !!(this.hass && this.hass.entities?.[e]), r = !t && !n && e.includes("/") && !!this.hass && (() => {
				let [t, n] = e.split("/", 2), r = (e) => e.toLowerCase().replace(/[^a-z0-9]/g, "_"), i = r(t), a = r(n);
				return Object.keys(this.hass.states).some((e) => {
					let t = e.toLowerCase();
					return t.includes(i) && t.includes(a);
				});
			})(), i = t || n || r;
			return w`
                    <div class="entity-row ${i ? "" : "entity-warn"}">
                      <span class="entity-id">${e}</span>
                      ${i ? D : w`<span
                              class="warn-icon"
                              title="Entity not found in HA — check ID"
                              >⚠</span
                            >`}
                      <button
                        class="remove-btn"
                        @click="${() => this._removeEntity(e)}"
                        aria-label="Remove"
                      >
                        ✕
                      </button>
                    </div>
                  `;
		})}
              </div>
            ` : w`<p class="hint">No entities added yet.</p>`}

      <datalist id="github-entity-list">
        ${r.map((e) => w`<option value="${e}"></option>`)}
      </datalist>
      <div class="add-entity-row">
        <input
          type="text"
          class="text-input entity-input"
          list="github-entity-list"
          placeholder="sensor.myrepo_watchers_count"
          .value="${this._pickerValue}"
          @input="${(e) => {
			this._pickerValue = e.target.value;
		}}"
          @change="${this._entityPicked}"
        />
        <button class="add-btn" @click="${this._addCurrentEntity}">Add</button>
      </div>
      <p class="hint">
        ${r.length > 0 ? w`${r.length} GitHub entities available — pick
              from list or type any entity ID.` : w`No GitHub entities auto-detected. Type the entity ID manually
                (e.g. <em>sensor.owner_repo_watchers_count</em>).`}
      </p>

      <div class="section-label">Rows — ${n.length} / 5</div>

      ${n.map((e, t) => w`
          <div class="row-block">
            <div class="row-block-header">
              <span class="row-block-title">Row ${t + 1}</span>
              <div class="col-count-btns">
                <span class="col-count-label">Cols:</span>
                ${[
			1,
			2,
			3
		].map((n) => w`
                    <button
                      class="col-count-btn ${e.length === n ? "active" : ""}"
                      @click="${() => this._setRowColCount(t, n)}"
                    >
                      ${n}
                    </button>
                  `)}
              </div>
              <button
                class="remove-btn row-remove-btn"
                @click="${() => this._removeRow(t)}"
                aria-label="Remove row"
                ?disabled="${n.length <= 1}"
              >
                ✕
              </button>
            </div>
            <div class="slot-row">
              ${e.map((e, n) => this._renderSlotSelect(t, n, e, `Col ${n + 1}`))}
            </div>
          </div>
        `)}
      ${n.length < 5 ? w`
              <button class="add-row-btn" @click="${() => this._addRow()}">
                + Add Row
              </button>
            ` : D}

      <div class="section-label">Conditional Colors</div>
      ${[
			["stars", "Stars"],
			["forks", "Forks"],
			["watchers", "Watchers"],
			["issues", "Issues"],
			["pull_requests", "Pull Requests"]
		].map(([t, n]) => w`
          <div class="color-slot-block">
            <div class="color-slot-header">
              <span class="color-slot-label">${n}</span>
              <button
                class="add-color-btn"
                @click="${() => this._addColorRule(t)}"
              >
                + Rule
              </button>
            </div>
            ${(e.slot_colors?.[t] ?? []).map((e, n) => w`
                <div class="color-rule-row">
                  <select
                    class="color-type-select"
                    @change="${(e) => this._updateColorRule(t, n, { type: e.target.value })}"
                  >
                    <option
                      value="text"
                      ?selected="${e.type !== "background"}"
                    >
                      Text
                    </option>
                    <option
                      value="background"
                      ?selected="${e.type === "background"}"
                    >
                      BG
                    </option>
                  </select>
                  <select
                    class="color-op-select"
                    @change="${(e) => this._updateColorRule(t, n, { op: e.target.value })}"
                  >
                    ${[
			">",
			">=",
			"<",
			"<=",
			"=="
		].map((t) => w`
                        <option value="${t}" ?selected="${e.op === t}">
                          ${t}
                        </option>
                      `)}
                  </select>
                  <input
                    type="number"
                    class="text-input color-threshold-input"
                    .value="${String(e.value)}"
                    @change="${(e) => this._updateColorRule(t, n, { value: parseFloat(e.target.value) || 0 })}"
                  />
                  <div
                    class="color-preview"
                    style="background:${e.color}"
                  ></div>
                  <input
                    type="text"
                    class="text-input color-color-input"
                    .value="${e.color}"
                    placeholder="#f44336"
                    @change="${(e) => this._updateColorRule(t, n, { color: e.target.value })}"
                  />
                  <button
                    class="remove-btn"
                    @click="${() => this._removeColorRule(t, n)}"
                  >
                    ✕
                  </button>
                </div>
              `)}
          </div>
        `)}

      <div class="section-label">Visual Options</div>
      <label class="toggle-row">
        <input
          type="checkbox"
          .checked="${e.show_header !== !1}"
          @change="${(e) => this._setValue("show_header", e.target.checked)}"
        />
        Show Card Header (title bar)
      </label>
      <label class="toggle-row">
        <input
          type="checkbox"
          .checked="${e.show_header_icon !== !1}"
          @change="${(e) => this._setValue("show_header_icon", e.target.checked)}"
        />
        Show GitHub Icon in Header
      </label>
      <label class="toggle-row">
        <input
          type="checkbox"
          .checked="${e.show_avatar !== !1}"
          @change="${(e) => this._setValue("show_avatar", e.target.checked)}"
        />
        Show Owner Avatar
      </label>
      <label class="toggle-row">
        <input
          type="checkbox"
          .checked="${!!e.compact}"
          @change="${(e) => this._setValue("compact", e.target.checked)}"
        />
        Compact Layout
      </label>

      <div class="section-label">Activity Chart</div>
      <label class="toggle-row">
        <input
          type="checkbox"
          .checked="${!!e.show_activity}"
          @change="${(e) => this._setValue("show_activity", e.target.checked)}"
        />
        Show activity chart below each repository
      </label>
      ${e.show_activity ? ft(e, (e) => this._fireConfigChanged({
			...this._config,
			...e
		})) : D}
    `;
	}
	_renderSlotSelect(e, t, n, r) {
		let i = this._config.icons?.[n] ?? "";
		return w`
      <div class="slot-select-wrap">
        <span class="slot-col-label">${r}</span>
        <select
          @change="${(n) => this._setRowSlot(e, t, n.target.value)}"
        >
          ${mt.map(([e, t]) => w`
              <option value="${e}" ?selected="${e === n}">
                ${t}
              </option>
            `)}
        </select>
        ${n === "none" ? D : w`
                <div class="icon-override-row">
                  ${i ? w`<ha-icon
                          class="icon-preview"
                          .icon="${i}"
                        ></ha-icon>` : w`<span class="icon-preview-placeholder"
                          >&#xFFFD;</span
                        >`}
                  <input
                    type="text"
                    class="text-input icon-input"
                    placeholder="mdi:star"
                    .value="${i}"
                    title="Override icon (leave empty to use sensor default)"
                    @change="${(e) => this._setSlotIcon(n, e.target.value)}"
                  />
                </div>
              `}
      </div>
    `;
	}
	static {
		this.styles = [
			dt,
			pt,
			o`
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
};
q([F({ attribute: !1 }), K("design:type", Object)], X.prototype, "hass", void 0), q([I(), K("design:type", Object)], X.prototype, "_config", void 0), q([I(), K("design:type", Object)], X.prototype, "_pickerValue", void 0);
// src/github-activity-card.ts
var Z = class extends P {
	get hass() {
		return this._hass;
	}
	set hass(e) {
		this._hass = e, this.requestUpdate();
	}
	static getConfigElement() {
		return document.createElement("ha-github-activity-card-editor");
	}
	static getStubConfig(e) {
		return {
			type: "custom:ha-github-activity-card",
			entity: e ? et(e)[0] ?? "" : "",
			show_header: !0,
			show_header_icon: !0,
			activity_range: "7d",
			activity_metrics: [...Fe]
		};
	}
	setConfig(e) {
		if (typeof e.entity != "string") throw Error("ha-github-activity-card: \"entity\" must be a string");
		this._config = {
			...e,
			entity: e.entity.trim()
		};
	}
	getCardSize() {
		return 3;
	}
	render() {
		if (!this._config || !this.hass) return D;
		let e = this._config.entity ? ot(this.hass, this._config.entity) : null, t = this._config.title || e?.attributes.full_name || e?.friendly_name || "GitHub Activity";
		return w`
      <ha-card>
        ${ct({
			...this._config,
			title: t
		})}
        <div class="card-content">
          ${e ? w`<ha-github-activity-chart
                  .hass="${this.hass}"
                  .sources="${e.activity_sources}"
                  .options="${this._config}"
                ></ha-github-activity-chart>` : w`<div class="empty">
                  ${this._config.entity ? `Entity "${this._config.entity}" not found.` : "No GitHub entity configured."}
                </div>`}
        </div>
      </ha-card>
    `;
	}
	static {
		this.styles = [lt, o`
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
    `];
	}
};
q([I(), K("design:type", Object)], Z.prototype, "_config", void 0);
// src/editor/github-activity-card-editor.ts
var Q = class extends P {
	setConfig(e) {
		this._config = { ...e };
	}
	_update(e) {
		if (!this._config) return;
		let t = {
			...this._config,
			...e
		};
		this._config = t, this.dispatchEvent(new CustomEvent("config-changed", {
			detail: { config: t },
			bubbles: !0,
			composed: !0
		}));
	}
	render() {
		if (!this._config) return D;
		let e = this._config, t = this.hass ? et(this.hass) : [];
		return w`
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
          .value="${e.entity ?? ""}"
          @change="${(e) => this._update({ entity: e.target.value.trim() })}"
        />
        <datalist id="activity-entity-list">
          ${t.map((e) => w`<option value="${e}"></option>`)}
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
          .value="${e.title ?? ""}"
          @change="${(e) => this._update({ title: e.target.value || void 0 })}"
        />
      </div>

      <div class="section-label">Activity Chart</div>
      ${ft(e, (e) => this._update(e))}

      <div class="section-label">Visual Options</div>
      <label class="toggle-row">
        <input
          type="checkbox"
          .checked="${e.show_header !== !1}"
          @change="${(e) => this._update({ show_header: e.target.checked })}"
        />
        Show Card Header (title bar)
      </label>
      <label class="toggle-row">
        <input
          type="checkbox"
          .checked="${e.show_header_icon !== !1}"
          @change="${(e) => this._update({ show_header_icon: e.target.checked })}"
        />
        Show GitHub Icon in Header
      </label>
    `;
	}
	static {
		this.styles = [dt, pt];
	}
};
q([F({ attribute: !1 }), K("design:type", Object)], Q.prototype, "hass", void 0), q([I(), K("design:type", Object)], Q.prototype, "_config", void 0);
// src/components/github-activity-chart.ts
var ht = 7, gt = 10, _t = 3e4, vt = 1e4, yt = 3, $ = class extends P {
	constructor(...e) {
		super(...e), this.sources = {}, this.options = {}, this._days = [], this._loadState = "loading", this._requestId = 0, this._retryAt = 0, this._reconcileAttempts = 0, this._live = new Je(), this._chartRenderers = {
			line: (e) => this._renderLine(e),
			bar: (e) => this._renderBars(e)
		};
	}
	connectedCallback() {
		super.connectedCallback(), this._scheduleMidnightRefresh(), this._requestKey = void 0, this._refresh();
	}
	disconnectedCallback() {
		super.disconnectedCallback(), clearTimeout(this._midnightTimer), this._midnightTimer = void 0, this._cancelReconcile(), this._requestKey = void 0, this._requestId += 1;
	}
	_cancelReconcile() {
		clearTimeout(this._reconcileTimer), this._reconcileTimer = void 0;
	}
	_scheduleReconcile(e) {
		this.isConnected && (this._reconcileAttempts >= yt || (this._reconcileAttempts += 1, this._cancelReconcile(), this._reconcileTimer = setTimeout(() => {
			this._reconcileTimer = void 0, e === this._requestKey && (this._requestKey = void 0, this._refresh());
		}, vt)));
	}
	_scheduleMidnightRefresh() {
		clearTimeout(this._midnightTimer);
		let e = /* @__PURE__ */ new Date(), t = new Date(e.getFullYear(), e.getMonth(), e.getDate() + 1).getTime() - e.getTime() + 1e3;
		this._midnightTimer = setTimeout(() => {
			this._refresh(), this._scheduleMidnightRefresh();
		}, t);
	}
	willUpdate(e) {
		(e.has("hass") || e.has("sources") || e.has("options")) && this._refresh();
	}
	_resolved() {
		return ze(this.options);
	}
	_refresh() {
		let e = this.hass;
		if (!e || !this.isConnected) return;
		let { range: t, metrics: n } = this._resolved(), r = n.map((e) => this.sources[e]).filter((e) => !!e);
		if (r.length === 0) {
			this._requestKey = void 0, this._requestId += 1, this._cancelReconcile(), this._loadState = "no-sources";
			return;
		}
		this._live.observe(e.states, r);
		let i = /* @__PURE__ */ new Date(), a = `${n.join(",")}#${Qe(e, r, t, i)}`;
		if (a === this._requestKey || this._loadState === "error" && Date.now() < this._retryAt) return;
		a !== this._reconcileKey && (this._cancelReconcile(), this._reconcileKey = a, this._reconcileAttempts = 0), this._requestKey = a;
		let o = ++this._requestId;
		this._loadState !== "ready" && (this._loadState = "loading"), $e(e, r, t, i).then((s) => {
			o === this._requestId && (this._live.prune(s), this._days = Ze(Xe(s, this._live.entries()), this.sources, n, t, i), this._loadState = "ready", Ye(s, e.states, r) && this._scheduleReconcile(a));
		}).catch(() => {
			o === this._requestId && (this._requestKey = void 0, this._retryAt = Date.now() + _t, this._loadState = "error");
		});
	}
	render() {
		let { range: e, metrics: t } = this._resolved(), n = t.filter((e) => this.sources[e]);
		return w`
      <div class="activity">
        <div class="activity-header">
          <span class="activity-title">Activity · ${z[e].label}</span>
          ${this._loadState === "ready" ? this._renderLegend(n) : D}
        </div>
        ${this._renderBody(n)}
      </div>
    `;
	}
	_renderBody(e) {
		switch (this._loadState) {
			case "no-sources": return w`<div class="activity-message">
          No activity sensors found for this repository.
        </div>`;
			case "error": return w`<div class="activity-message">
          Activity history unavailable.
        </div>`;
			case "loading": return w`<div class="activity-message">Loading activity…</div>`;
			case "ready": return this._renderChart(e);
		}
	}
	_renderLegend(e) {
		return w`
      <div class="legend">
        ${e.map((e) => {
			let t = this._days.reduce((t, n) => t + n.counts[e], 0), n = L[e];
			return w`
            <span class="legend-item" title="${t} ${n.label}">
              <span class="legend-dot" style="background:${n.color}"></span>
              ${n.label}
              <span class="legend-count">${t}</span>
            </span>
          `;
		})}
      </div>
    `;
	}
	_renderChart(e) {
		let { chartType: t } = this._resolved(), n = this._days.every((e) => e.total === 0);
		return w`
      <div class="chart" role="img" aria-label="${this._ariaSummary(e)}">
        <div class="plot">
          ${this._chartRenderers[t](e)}
          ${n ? w`<div class="chart-empty">No activity in this period</div>` : D}
        </div>
        ${this._renderAxis()}
      </div>
      ${this._renderDataTable(e)}
    `;
	}
	_columnsStyle() {
		return `grid-template-columns: repeat(${this._days.length}, 1fr)`;
	}
	_renderAxis() {
		let e = Math.ceil(this._days.length / gt), t = this._days.length - 1;
		return w`
      <div class="axis" style="${this._columnsStyle()}">
        ${this._days.map((n, r) => w`
            <span class="day-label ${n.inProgress ? "in-progress" : ""}">
              ${(t - r) % e === 0 ? this._axisLabel(n) : ""}
            </span>
          `)}
      </div>
    `;
	}
	_renderBars(e) {
		let t = Math.max(0, ...this._days.map((e) => e.total));
		return w`
      <div class="bars" style="${this._columnsStyle()}">
        ${this._days.map((n) => w`
            <div
              class="bar ${n.inProgress ? "in-progress" : ""}"
              title="${this._dayTooltip(n, e)}"
            >
              ${e.map((e) => n.counts[e] > 0 ? w`<div
                      class="segment"
                      style="height:${n.counts[e] / t * 100}%;background:${L[e].color}"
                    ></div>` : D)}
            </div>
          `)}
      </div>
    `;
	}
	_renderLine(e) {
		let t = Math.max(0, ...this._days.flatMap((t) => e.map((e) => t.counts[e]))), n = this._days.length, r = (e) => (e + .5) / n * 100, i = (e) => 92 - (t > 0 ? e / t * 84 : 0), a = [...e].reverse(), o = this._days.findIndex((e) => e.inProgress), s = o === -1 ? n : o, c = (e, t, n, a) => {
			if (n - t < 2) return D;
			let o = this._days.slice(t, n).map((n, a) => `${r(t + a)},${i(n.counts[e])}`).join(" ");
			return T`<polyline
        class="series ${a ? "in-progress" : ""}"
        stroke="${L[e].color}"
        points="${o}"
      />`;
		};
		return w`
      <svg
        class="lines"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line class="baseline" x1="0" x2="100" y1="${i(0)}" y2="${i(0)}" />
        ${t > 0 ? T`<line class="gridline" x1="0" x2="100" y1="${i(t)}" y2="${i(t)}" />` : D}
        ${a.map((e) => T`
            ${c(e, 0, s, !1)}
            ${o === -1 ? D : c(e, Math.max(0, o - 1), n, !0)}
          `)}
      </svg>
      ${a.map((e) => this._days.map((t, n) => t.counts[e] > 0 ? w`<span
                class="point ${t.inProgress ? "in-progress" : ""}"
                style="left:${r(n)}%;top:${i(t.counts[e])}%;--point-color:${L[e].color}"
              ></span>` : D))}
      ${t > 0 ? w`<span class="y-max" style="top:${i(t)}%">${t}</span>` : D}
      <div class="hover-columns" style="${this._columnsStyle()}">
        ${this._days.map((t) => w`<div
              class="hover-column"
              title="${this._dayTooltip(t, e)}"
            ></div>`)}
      </div>
    `;
	}
	_formatDay(e) {
		let t = this.hass?.language;
		return this._days.length <= ht ? e.toLocaleDateString(t, { weekday: "short" }) : e.toLocaleDateString(t, {
			day: "numeric",
			month: "numeric"
		});
	}
	_todayLabel() {
		let e = this.hass?.language, t = new Intl.RelativeTimeFormat(e, { numeric: "auto" }).format(0, "day");
		return t.charAt(0).toLocaleUpperCase(e) + t.slice(1);
	}
	_axisLabel(e) {
		return e.inProgress ? this._todayLabel() : this._formatDay(e.date);
	}
	_dayName(e, t) {
		let n = e.date.toLocaleDateString(this.hass?.language, t);
		return e.inProgress ? `${n} (${this._todayLabel()}, in progress)` : n;
	}
	_dayTooltip(e, t) {
		return `${this._dayName(e, {
			weekday: "short",
			day: "numeric",
			month: "short"
		})}: ${t.map((t) => `${e.counts[t]} ${L[t].label}`).join(", ")}`;
	}
	_ariaSummary(e) {
		return `Activity: ${e.map((e) => `${this._days.reduce((t, n) => t + n.counts[e], 0)} ${L[e].label}`).join(", ")}`;
	}
	_renderDataTable(e) {
		return w`
      <table class="visually-hidden">
        <caption>
          Daily activity
        </caption>
        <thead>
          <tr>
            <th scope="col">Day</th>
            ${e.map((e) => w`<th scope="col">${L[e].label}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${this._days.map((t) => w`
              <tr>
                <th scope="row">
                  ${this._dayName(t, {
			weekday: "long",
			day: "numeric",
			month: "long"
		})}
                </th>
                ${e.map((e) => w`<td>${t.counts[e]}</td>`)}
              </tr>
            `)}
        </tbody>
      </table>
    `;
	}
	static {
		this.styles = o`
    :host {
      display: block;
    }

    .visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      overflow: hidden;
      clip: rect(0 0 0 0);
      white-space: nowrap;
      border: 0;
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
      height: var(--gh-activity-chart-height, 64px);
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

    .bar.in-progress .segment {
      opacity: 0.5;
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

    .series.in-progress {
      stroke-dasharray: 4 4;
    }

    .point {
      position: absolute;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      background: var(--point-color);
      box-shadow: 0 0 0 1.5px var(--card-background-color, #fff);
      pointer-events: none;
    }

    .point.in-progress {
      box-sizing: border-box;
      background: var(--card-background-color, #fff);
      border: 2px solid var(--point-color);
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

    .day-label.in-progress {
      font-style: italic;
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
};
q([F({ attribute: !1 }), K("design:type", Object)], $.prototype, "hass", void 0), q([F({ attribute: !1 }), K("design:type", typeof Partial > "u" ? Object : Partial)], $.prototype, "sources", void 0), q([F({ attribute: !1 }), K("design:type", Object)], $.prototype, "options", void 0), q([I(), K("design:type", Array)], $.prototype, "_days", void 0), q([I(), K("design:type", Object)], $.prototype, "_loadState", void 0);
// src/index.ts
var bt = "https://github.com/dmoo500/ha-github-card";
console.info("%c GITHUB-CARD %c 0.1.0 ", "color: white; background: #24292e; font-weight: 700;", "color: #24292e; background: white; font-weight: 700;");
var xt = [
	["ha-github-activity-chart", $],
	["ha-github-card", Y],
	["ha-github-card-editor", X],
	["ha-github-activity-card", Z],
	["ha-github-activity-card-editor", Q]
];
for (let [e, t] of xt) customElements.get(e) || customElements.define(e, t);
window.customCards ??= [], window.customCards.push({
	type: "ha-github-card",
	name: "GitHub Card",
	description: "Display information from your GitHub repositories tracked via the GitHub integration.",
	preview: !0,
	documentationURL: bt
}, {
	type: "ha-github-activity-card",
	name: "GitHub Activity Card",
	description: "Daily commits, pull requests and issues of a GitHub repository, based on the recorded sensor history.",
	preview: !0,
	documentationURL: bt
});
export { Z as GithubActivityCard, Q as GithubActivityCardEditor, $ as GithubActivityChart, Y as GithubCard, X as GithubCardEditor };

//# sourceMappingURL=ha-github-card.js.map