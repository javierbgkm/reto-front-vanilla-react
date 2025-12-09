import { StringList } from "../../components/StringList/StringList";
import "./StringListView.css";

const title = "This is a technical proof";
const description = `Lorem ipsum dolor sit amet consectetur adipiscing, elit mus primis nec inceptos.
          Lacinia habitasse arcu molestie maecenas cursus quam nunc, hendrerit posuere augue fames dictumst placerat porttitor,
          dis mi pharetra vestibulum venenatis phasellus.`;

export const StringListView = () => {
  return (
    <div className="string-list-view">
      <StringList {...{ title, description }} />
    </div>
  );
};
