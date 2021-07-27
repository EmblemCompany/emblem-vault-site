import { useWeb3React } from '@web3-react/core';
import React, { Component, useEffect, useState } from 'react';
import { withGun } from 'react-gun';

type GunProps = {
    gun: any,
}

// class ComponentThatUsesGun extends Component<GunProps> {
//   componentDidMount() {
//     this.props.gun.get('think2/' + location.hash.slice(1)).on(bar => {
//         let values: any[] = Object.keys(bar).map((key) => { return {"id": key, "val": bar[key]}}).filter(item=>{ return item.val != "" && item.id != "_"})
//         this.setState(values);
//     });
//   }
//   render() {
//     if (!this.state) {
//       return <div>Loading...</div>;
//     }
//     return (
//         <WithWeb3 {...this.state}/>
//     )
//   }
// }

// function WithWeb3(values) : JSX.Element {
//     const { account, library, chainId } = useWeb3React()
//     return (
//         <>{account} {values[0].val} </>
//     )
// }

class ComponentThatUsesGun extends Component<GunProps> {
    componentDidMount() {
        this.setState({});
    }
    render() {
        if (!this.state) {
            return <div>Loading...</div>;
        }
        return (
            <WithWeb3 {...this.props} />
        )
    }
}

function WithWeb3(props): JSX.Element {

    const { account, library, chainId } = useWeb3React()
    const [values, setValues] = useState(null)
    const [gun] = useState(props.gun)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        !loaded ? (
            gun.get('think2/' + location.hash.slice(1)).on(bar => {
                setValues(Object.keys(bar).map((key) => { return { "id": key, "val": bar[key] } }).filter(item => { return item.val != "" && item.id != "_" }))
            })
        ) : (
            setLoaded(true)
        )
    }, [])

    return (
        <>
            {account}
            {values && values.length ? values.map((item) => {
                return (
                    <div>{item.val}</div>
                )

            }) : null}
        </>
    )
}

export default withGun(ComponentThatUsesGun);