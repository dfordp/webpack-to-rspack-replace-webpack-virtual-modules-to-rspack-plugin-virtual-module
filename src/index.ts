export default function transform(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let dirtyFlag = false;

  // Find the require statement for 'webpack-virtual-modules'
  root.find(j.VariableDeclarator, {
    init: {
      callee: { name: 'require' },
      arguments: [{ value: 'webpack-virtual-modules' }]
    }
  }).forEach(path => {
    // Replace the require statement with 'rspack-plugin-virtual-module'
    path.node.init.arguments[0].value = 'rspack-plugin-virtual-module';
    // Rename the variable to 'RspackVirtualModulePlugin'
    path.node.id.name = 'RspackVirtualModulePlugin';
    dirtyFlag = true;
  });

  // Update the instantiation in the plugins array
  root.find(j.NewExpression, {
    callee: { name: 'VirtualModulesPlugin' }
  }).forEach(path => {
    path.node.callee.name = 'RspackVirtualModulePlugin';
    dirtyFlag = true;
  });

  return dirtyFlag ? root.toSource() : undefined;
}


export const parser = "tsx";