export function clx(...args) {
    return args.filter(Boolean).join(' ');
}

//clx(class1, class2) => class1
// он берет аргументы (например нам надо добавить несколько стилей), join - объединяет эти аргементы через пробелы,
// в .filter() смотрит внутри условие, и возвращает все элементы не подходящие под это условие, т е yt Boolen
//в нашем случае нужен Boolen, т к если будет undefined это не сработает, т е если будет один элемент, останется он