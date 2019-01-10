export default [{
  component: 'Input',
  formItemConfig: {
    base: {
      label: '输入框'
    },
    extra: {
      configRules: {
        required: false, min: '', max: '', reg: ''
      },
      failedMessage: ''
    }
  },
  config: {
    placeholder: '',
    valueType: 'string',
    textTip: ''
  }
}, {
  component: 'Radio',
  formItemConfig: {
    base: {
      label: '单选框'
    },
    extra: {
      configRules: {
        required: false
      },
      failedMessage: ''
    }
  },
  config: {
    valueType: 'string',
    textTip: '',
    bind: false,
    bindKey: '',
    bindData: [],
    keyBindData: '',
    keyLabel: 'label',
    options: [{
      label: '单选框1'
    }, {
      label: '单选框2'
    }]
  }
}, {
  component: 'CheckBox',
  formItemConfig: {
    base: {
      label: '多选框'
    },
    extra: {
      configRules: {
        required: false
      },
      failedMessage: ''
    }
  },
  config: {
    valueType: 'array',
    textTip: '',
    bind: false,
    bindKey: '',
    bindData: [],
    keyBindData: '',
    keyLabel: 'label',
    options: [{
      label: '多选框1'
    }, {
      label: '多选框2'
    }]
  }
}, {
  component: 'Select',
  formItemConfig: {
    base: {
      label: '下拉框'
    },
    extra: {
      configRules: {
        required: false
      },
      failedMessage: ''
    }
  },
  config: {
    placeholder: '输入关键字进行过滤',
    valueType: 'string',
    textTip: '',
    bind: false,
    bindKey: '',
    bindData: [],
    keyBindData: '',
    keyValue: 'value',
    keyLabel: 'label',
    options: [{
      label: '选项一', value: '选项一'
    }, {
      label: '选项二', value: '选项一'
    }]
  }
}, {
  component: 'MultiSelect',
  formItemConfig: {
    base: {
      label: '多选下拉框'
    },
    extra: {
      configRules: {
        required: false
      },
      failedMessage: ''
    }
  },
  config: {
    placeholder: '输入关键字进行过滤',
    valueType: 'array',
    textTip: '',
    bind: false,
    bindKey: '',
    bindData: [],
    keyBindData: '',
    keyValue: 'value',
    keyLabel: 'label',
    options: [{
      value: '选项一',
      label: '选项一'
    }, {
      value: '选项二',
      label: '选项二'
    }, {
      value: '选项三',
      label: '选项三'
    }]
  }
}, {
  component: 'DatePicker',
  formItemConfig: {
    base: {
      label: '日期选择'
    },
    extra: {
      configRules: {
        required: false
      },
      failedMessage: ''
    }
  },
  config: {
    placeholder: '',
    valueType: 'string',
    textTip: ''
  }
}, {
  component: 'Textarea',
  formItemConfig: {
    base: {
      label: '文本域'
    },
    extra: {
      configRules: {
        required: false, min: '', max: ''
      },
      failedMessage: ''
    }
  },
  config: {
    placeholder: '',
    valueType: 'string',
    textTip: ''
  }
}, {
  component: 'Tree',
  formItemConfig: {
    base: {
      label: '树组件'
    },
    extra: {
      configRules: {
        required: false
      },
      failedMessage: ''
    }
  },
  config: {
    placeholder: '请选择',
    valueType: 'array',
    textTip: '',
    bind: true,
    bindKey: '',
    bindData: [],
    keyBindData: '',
    keyLabel: 'label',
    keyChildren: 'children',
    nodeKey: 'id',
    options: []
  }
}, {
  component: 'Transfer',
  formItemConfig: {
    base: {
      label: '穿梭框'
    },
    extra: {
      configRules: {
        required: false
      },
      failedMessage: ''
    }
  },
  config: {
    placeholder: '请选择',
    valueType: 'array',
    textTip: '',
    bind: true,
    bindKey: '',
    bindData: [],
    keyBindData: '',
    keyLabel: 'label',
    keyChildren: 'children',
    nodeKey: 'id',
    options: []
  }
}, {
  component: 'Upload',
  formItemConfig: {
    base: {
      label: '上传'
    },
    extra: {
      configRules: {
        required: false
      },
      failedMessage: ''
    }
  },
  config: {
    action: 'https://jsonplaceholder.typicode.com/posts/',
    valueType: 'array',
    textTip: ''
  }
}, {
  component: 'ColorPicker',
  formItemConfig: {
    base: {
      label: '颜色选择'
    },
    extra: {
      configRules: {
        required: false
      },
      failedMessage: ''
    }
  },
  config: {
    placeholder: '',
    valueType: 'string',
    textTip: ''
  }
}]
