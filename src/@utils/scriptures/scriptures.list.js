

function scriptureList({ scripture, commas = true } = {}) {
  // XXX i'm not sure this check is necessary
  if (!scripture && commas) return [];
  if (!scripture) return [];

  const combo = scripture.map(({ book, passage }) => (
    `${book} ${passage}`
  ));

  if (commas) return combo.join(', ');
  return combo;
}

export default scriptureList;
