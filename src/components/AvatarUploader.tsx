import Image from "next/image";

type AvatarUploaderProps = {
    onChange: (value: string) => void;
    value: string;
};

const AvatarUploader = ({ onChange, value }: AvatarUploaderProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                onChange(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="relative w-full flex flex-col justify-center items-center gap-4 border-2 border-dashed border-base-content border-opacity-40 rounded-lg p-4">
            <h5 className="absolute left-4 top-2 text-content opacity-50">프로필 사진</h5>
            <Image width={64} height={64} src={value} alt="아바타" className="rounded-full" />
            <input
                type="file"
                accept="image/*"
                className="file-input file-input-sm file-input-bordered"
                onChange={handleChange}
            />
        </div>
    );
};

export default AvatarUploader;
