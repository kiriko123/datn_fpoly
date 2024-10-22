import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useState } from "react";

const Checkout = () => {
    const [{ isPending }] = usePayPalScriptReducer();
    const [currency, setCurrency] = useState("USD");

    const onCreateOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [{ amount: { value: "10.00" } }],
        });
    };

    const onApproveOrder = (data, actions) => {
        return actions.order.capture().then((details) => {
            alert(`Transaction completed by ${details.payer.name.given_name}`);
        });
    };

    return (
        <div>
            {isPending ? <p>Loading...</p> : (
                <>
                    <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="VND">CAD</option>
                    </select>
                    <PayPalButtons
                        createOrder={onCreateOrder}
                        onApprove={onApproveOrder}
                    />
                </>
            )}
        </div>
    );
};

export default Checkout;
