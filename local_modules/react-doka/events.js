const isEvent = (key) => /^on[A-Z]/.test(key);

const getEventsFromProps = (props) => Object.keys(props).filter(isEvent).map(getEventFromKey);

const getEventFromKey = (key) => key.substr(2).toLowerCase();

export const unsub = (component, events = undefined) => {
    (component.unsubs || [])
        // events not supplied, or event is in events list
        .filter(([event]) => !events || events.includes(event))
        .forEach(([, unsub]) => unsub());
};

export const sub = (component, props) => {
    // unsub existing subscriptions
    unsub(component, getEventsFromProps(props));

    // subscribe
    component.unsubs = Object.keys(props)
        .filter(isEvent)
        .map((key) => {
            const type = getEventFromKey(key);
            return [type, component.editor.on(type, props[key])];
        });
};
