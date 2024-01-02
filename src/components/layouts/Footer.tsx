export default function Footer() {
  return (
    <main>
      <footer className="mx-4 py-4 text-[13px] text-[#65676B]">
        <a href="#" className="hover:underline">
          Privacy
        </a>{" "}
        ·{" "}
        <a href="#" className="hover:underline">
          Terms
        </a>{" "}
        ·{" "}
        <a href="#" className="hover:underline">
          Advertising
        </a>{" "}
        ·{" "}
        <a href="#" className="hover:underline">
          Ad Choices{" "}
          <i
            data-visualcompletion="css-img"
            className="text-[#65676B] relative top-[1px]"
            style={{
              backgroundImage:
                'url("https://static.xx.fbcdn.net/rsrc.php/v3/yU/r/oFVvh1aFRxO.png?_nc_eui2=AeExwzmTfYNhFaUfx1CpQc74l3UnZpnQx8qXdSdmmdDHyhfnDSczT2FQKNm0qkvF90sDRR9fWfQnzxRY3o0jpLOd")',
              backgroundPosition: "0 -164px",
              backgroundSize: "189px 177px",
              width: 12,
              height: 12,
              backgroundRepeat: "no-repeat",
              display: "inline-block",
            }}
          />
        </a>{" "}
        ·{" "}
        <a href="#" className="hover:underline">
          Cookies
        </a>{" "}
        ·{" "}
        <a href="#" className="hover:underline">
          More
        </a>{" "}
        · <span>Meta © 2023</span>
      </footer>
    </main>
  );
}
