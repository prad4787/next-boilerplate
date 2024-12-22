import BgImage from "./../../assets/images/auth/bg.jpg";

export default function AuthLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="flex justify-center items-center h-screen w-full" style={{ backgroundImage: `url(${BgImage.src})`, backgroundSize: "cover" }}>
           {children}
        </div>
    )
}
