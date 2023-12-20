import React from "react";
import "./style.css";

const CoverLetter = ({ applicantDetails }) => {
  return (
    <>
      {/* <div className="coverLetter">
        <h1>Vlad Blyshchyk</h1>
        <h3>UI/UX and Product Designer</h3>
      </div> */}

      <div className="coverletter_div">
        <h2>To whom it may concern,</h2>
        <p>
          At accumsan massa aliquet lectus. Egestas eleifend feugiat diam eget
          leo blandit tincidunt. Quisque diam et volutpat amet eleifend feugiat.
          Mauris amet ultrices sed urna id et. Facilisi eget in sollicitudin
          orci condimentum dui massa posuere. Consectetur sem auctor ac velit
          elit suspendisse duis nibh iaculis. Scelerisque cras egestas aliquam
          amet lacus lectus sapien nisl orci. Et placerat tempus urna turpis
          amet augue et. Sed nulla ultrices pulvinar nunc justo ultrices egestas
          nec. Justo ornare sagittis venenatis consequat vel mauris condimentum.
          Elementum laoreet fermentum id nibh sed amet. Volutpat turpis egestas
          ac mauris ipsum eget id. Amet id pellentesque tempor aliquet tristique
          nunc dictum cursus vestibulum. Curabitur urna nisl ultrices vitae
          maecenas in tellus at turpis. Imperdiet gravida sed blandit lectus
          amet porta suspendisse. Suscipit vivamus aenean vitae lectus nibh
          mattis vestibulum consequat. Eu sed facilisis suspendisse pharetra.
          Varius consequat adipiscing dictum lectus arcu mauris tempor. Nullam
          facilisi vitae bibendum fermentum morbi nunc tellus. Vehicula integer
          risus vulputate quam sit ornare. Lacinia eget est enim pretium.
          Gravida vestibulum nisl donec habitant. Sed massa donec libero ipsum
          nisi nisl pretium dolor. Posuere lacus lacus semper amet dolor. Quis
          sed lorem et nunc netus eu tortor facilisi a. In etiam dapibus
          consectetur egestas. Gravida vitae metus auctor sit sodales. Enim
          adipiscing fames vitae ultricies scelerisque ac ut rhoncus ante. Vitae
          quis lacinia donec id viverra elit scelerisque. Odio morbi ullamcorper
          tortor elementum etiam aliquet. Quam vel magna tortor aliquam arcu
          turpis ut pharetra. Vestibulum faucibus est pharetra at at dolor sit.
          Donec neque sed libero felis integer amet. Platea felis vitae ac
          congue arcu. Aenean tincidunt molestie netus vel sapien ultricies
          interdum lobortis ornare.
        </p>
        <h3 style={{ marginTop: "50px" }}>Sincerely,</h3>
        <h3>{applicantDetails.name}</h3>
      </div>
    </>
  );
};

export default CoverLetter;
