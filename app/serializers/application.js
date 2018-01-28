import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  // Only send the attributes that have changed.
  serializeAttribute(snapshot, json, key, attributes) {

    // Don't serialize readonly objects
    if (attributes.options && attributes.options.readOnly) {
      return;
    }

    // Only serialize objects that have changed or are new.
    if (snapshot.changedAttributes()[key]) {
      this._super(snapshot, json, key, attributes);
    }
  }

});
