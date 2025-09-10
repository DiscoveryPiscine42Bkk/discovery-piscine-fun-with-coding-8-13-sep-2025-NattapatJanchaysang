(function () {
  var LIST_KEY = 'ft_list_items_v1';

  function readItems() {
    try {
      var raw = localStorage.getItem(LIST_KEY);
      if (!raw) return [];
      var parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    } catch (e) {}
    return [];
  }

  function writeItems(items) {
    try { localStorage.setItem(LIST_KEY, JSON.stringify(items)); } catch (e) {}
  }

  function createTodoElement(text) {
    var el = document.createElement('div');
    el.className = 'todo';
    el.textContent = text;
    el.addEventListener('click', function () {
      if (confirm('Remove this TO DO?')) {
        el.remove();
        persistFromDOM();
      }
    });
    return el;
  }

  function renderFromItems(items) {
    var list = document.getElementById('ft_list');
    list.innerHTML = '';
    // We append and rely on column-reverse to show newest first
    items.forEach(function (t) { list.appendChild(createTodoElement(t)); });
  }

  function persistFromDOM() {
    var list = document.getElementById('ft_list');
    var items = Array.prototype.map.call(list.children, function (node) {
      return node.textContent;
    });
    writeItems(items);
  }

  function addNew() {
    var text = prompt('Enter a new TO DO:');
    if (text && text.trim() !== '') {
      var list = document.getElementById('ft_list');
      var el = createTodoElement(text.trim());
      // Place at the top: since we use column-reverse, we append
      list.appendChild(el);
      persistFromDOM();
    }
  }

  function init() {
    var items = readItems();
    renderFromItems(items);
    document.getElementById('newBtn').addEventListener('click', addNew);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();


