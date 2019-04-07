// test "for" tag

test('for', 18, function() {
  var template = '{for x in arr}{x}{/for}';

  equal(whiskers.render(template, {}), '');

  var context = {arr:[1,2,3]};
  equal(whiskers.render(template, context), '123');

  context = {arr:'string'};
  equal(whiskers.render(template, context), 'string');

  context = {arr:3};
  equal(whiskers.render(template, context), '');

  context = {arr:{b:'orange'}};
  equal(whiskers.render(template, context), '');

  context = {arr:function(){return [1,2,3]}()};
  equal(whiskers.render(template, context), '123');

  template = '{for x in arr}{x.y}{/for}';

  equal(whiskers.render(template, {}), '');

  context = {arr:[{y:1},{y:2},{y:3}]};
  equal(whiskers.render(template, context), '123');

  context = {arr:[1,2,3]};
  equal(whiskers.render(template, context), '');

  context = {arr:'string'};
  equal(whiskers.render(template, context), '');

  context = {arr:{b:'orange'}};
  equal(whiskers.render(template, context), '');

  template = '{for x in arr}{for y in x}{y.z}{/for}{/for}';

  equal(whiskers.render(template, {}), '');

  context = {arr:[[{z:1},{z:2}],[{z:3}]]};
  equal(whiskers.render(template, context), '123');

  template = '{for x in arr}{x}{else}blah{/for}';

  equal(whiskers.render(template, {}), 'blah');

  context = {arr:[1,2,3]};
  equal(whiskers.render(template, context), '123');

  template = '{for x-y in foo-bar.arr-var}{x-y}{else}blah{/for}';

  equal(whiskers.render(template, {}), 'blah');

  context = {'foo-bar': {'arr-var': [1,2,3]}};
  equal(whiskers.render(template, context), '123');

  // loop var used above shouldn't populate the general context #22
  equal(context['x-y'], '');
});
