import Code from "../blocks/code";
import { H3 } from "../blocks/headers";

const PythonMod = ({ connector, module }) => {
    return (
        <article>
            <section>
                  <H3>Python Requirements</H3>
                  <p>To run the {connector} ingestion, you will need to install:</p>
                  <Code
                    language="bash"
                    code={`pip3 install "openmetadata-ingestion[${module}]"`}
                  />
            </section>
        </article>
    );
};

export default PythonMod;
