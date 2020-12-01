(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.VueCountup = {})));
}(this, (function (exports) { 'use strict';

  //
  //
  //
  //
  //
  //
  //

  function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path);
  }
  var script = {
    name: 'SvgIcon',
    props: {
      iconClass: {
        type: String,
        required: true,
      },
      className: {
        type: String,
        default: '',
      },
    },
    computed: {
      isExternal: function isExternal$1() {
        return isExternal(this.iconClass);
      },
      iconName: function iconName() {
        return ("#svg-icon-" + (this.iconClass));
      },
      svgClass: function svgClass() {
        if (this.className) {
          return 'svg-icon ' + this.className;
        } else {
          return 'svg-icon';
        }
      },
      styleExternalIcon: function styleExternalIcon() {
        return {
          mask: ("url(" + (this.iconClass) + ") no-repeat 50% 50%"),
          '-webkit-mask': ("url(" + (this.iconClass) + ") no-repeat 50% 50%"),
        };
      },
    },
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
  /* server only */
  , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
      createInjectorSSR = createInjector;
      createInjector = shadowMode;
      shadowMode = false;
    } // Vue.extend constructor export interop.


    var options = typeof script === 'function' ? script.options : script; // render functions

    if (template && template.render) {
      options.render = template.render;
      options.staticRenderFns = template.staticRenderFns;
      options._compiled = true; // functional template

      if (isFunctionalTemplate) {
        options.functional = true;
      }
    } // scopedId


    if (scopeId) {
      options._scopeId = scopeId;
    }

    var hook;

    if (moduleIdentifier) {
      // server build
      hook = function hook(context) {
        // 2.3 injection
        context = context || // cached call
        this.$vnode && this.$vnode.ssrContext || // stateful
        this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
        // 2.2 with runInNewContext: true

        if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
          context = __VUE_SSR_CONTEXT__;
        } // inject component styles


        if (style) {
          style.call(this, createInjectorSSR(context));
        } // register component module identifier for async chunk inference


        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      }; // used by ssr in case component is cached and beforeCreate
      // never gets called


      options._ssrRegister = hook;
    } else if (style) {
      hook = shadowMode ? function () {
        style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
      } : function (context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook) {
      if (options.functional) {
        // register for functional component in vue file
        var originalRender = options.render;

        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }

    return script;
  }

  var normalizeComponent_1 = normalizeComponent;

  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
    return function (id, style) {
      return addStyle(id, style);
    };
  }
  var HEAD = document.head || document.getElementsByTagName('head')[0];
  var styles = {};

  function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: new Set(),
      styles: []
    });

    if (!style.ids.has(id)) {
      style.ids.add(id);
      var code = css.source;

      if (css.map) {
        // https://developer.chrome.com/devtools/docs/javascript-debugging
        // this makes source maps inside style tags work properly in Chrome
        code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

        code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
      }

      if (!style.element) {
        style.element = document.createElement('style');
        style.element.type = 'text/css';
        if (css.media) { style.element.setAttribute('media', css.media); }
        HEAD.appendChild(style.element);
      }

      if ('styleSheet' in style.element) {
        style.styles.push(code);
        style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
      } else {
        var index = style.ids.size - 1;
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) { style.element.removeChild(nodes[index]); }
        if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }else { style.element.appendChild(textNode); }
      }
    }
  }

  var browser = createInjector;

  /* script */
  var __vue_script__ = script;

  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _vm.isExternal
      ? _c(
          "div",
          _vm._g(
            {
              staticClass: "svg-external-icon svg-icon",
              style: _vm.styleExternalIcon
            },
            _vm.$listeners
          )
        )
      : _c(
          "svg",
          _vm._g(
            { class: _vm.svgClass, attrs: { "aria-hidden": "true" } },
            _vm.$listeners
          ),
          [_c("use", { attrs: { "xlink:href": _vm.iconName } })]
        )
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    var __vue_inject_styles__ = function (inject) {
      if (!inject) { return }
      inject("data-v-6f9de58f_0", { source: ".svg-icon[data-v-6f9de58f] {\n  min-width: 1em;\n  min-height: 1em;\n  overflow: hidden;\n  fill: currentColor;\n}\n.svg-icon[data-v-6f9de58f]:hover {\n    opacity: 0.8;\n}\n.svg-external-icon[data-v-6f9de58f] {\n  display: inline-block;\n  background-color: currentColor;\n  mask-size: cover !important;\n}\n\n/*# sourceMappingURL=icon.vue.map */", map: {"version":3,"sources":["E:\\tanwan-file\\tool-library\\plugin\\vue-svg\\icon.vue","icon.vue"],"names":[],"mappings":"AAgDA;EACA,cAAA;EACA,eAAA;EAEA,gBAAA;EACA,kBAAA;AAAA;AALA;IAQA,YAAA;AAAA;AAIA;EACA,qBAAA;EACA,8BAAA;EACA,2BAAA;AAAA;;AClDA,mCAAmC","file":"icon.vue","sourcesContent":["<template>\n  <div v-if=\"isExternal\" :style=\"styleExternalIcon\" class=\"svg-external-icon svg-icon\" v-on=\"$listeners\" />\n  <svg v-else :class=\"svgClass\" aria-hidden=\"true\" v-on=\"$listeners\">\n    <use :xlink:href=\"iconName\" />\n  </svg>\n</template>\n\n<script>\nfunction isExternal(path) {\n  return /^(https?:|mailto:|tel:)/.test(path);\n}\nexport default {\n  name: 'SvgIcon',\n  props: {\n    iconClass: {\n      type: String,\n      required: true,\n    },\n    className: {\n      type: String,\n      default: '',\n    },\n  },\n  computed: {\n    isExternal() {\n      return isExternal(this.iconClass);\n    },\n    iconName() {\n      return `#svg-icon-${this.iconClass}`;\n    },\n    svgClass() {\n      if (this.className) {\n        return 'svg-icon ' + this.className;\n      } else {\n        return 'svg-icon';\n      }\n    },\n    styleExternalIcon() {\n      return {\n        mask: `url(${this.iconClass}) no-repeat 50% 50%`,\n        '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`,\n      };\n    },\n  },\n};\n</script>\n\n<style lang=\"scss\" scoped>\n.svg-icon {\n  min-width: 1em;\n  min-height: 1em;\n  // vertical-align: -0.15em;\n  overflow: hidden;\n  fill: currentColor;\n\n  &:hover {\n    opacity: 0.8;\n  }\n}\n\n.svg-external-icon {\n  display: inline-block;\n  background-color: currentColor;\n  mask-size: cover !important;\n}\n</style>\n",".svg-icon {\n  min-width: 1em;\n  min-height: 1em;\n  overflow: hidden;\n  fill: currentColor; }\n  .svg-icon:hover {\n    opacity: 0.8; }\n\n.svg-external-icon {\n  display: inline-block;\n  background-color: currentColor;\n  mask-size: cover !important; }\n\n/*# sourceMappingURL=icon.vue.map */"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__ = "data-v-6f9de58f";
    /* module identifier */
    var __vue_module_identifier__ = undefined;
    /* functional template */
    var __vue_is_functional_template__ = false;
    /* style inject SSR */
    

    
    var SvgIcon = normalizeComponent_1(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      browser,
      undefined
    )

  var iconSymbol = 'svgIcon';
  SvgIcon.name = iconSymbol;

  // use object to export
  var JYSvgIconPlug = {
    install: function (Vue, opts) {
      if ( opts === void 0 ) opts = { name: iconSymbol, svgRequire: '' };

      // SvgIcon.name = opts.name;
      Vue.component(opts.name, SvgIcon);
    },
  };

  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.component(iconSymbol, SvgIcon);
  }

  exports.SvgIcon = SvgIcon;
  exports.iconSymbol = iconSymbol;
  exports.default = JYSvgIconPlug;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
