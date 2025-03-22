import Footer from "@/modules/landing/layouts/Footer";
import Header from "@/modules/landing/layouts/Header";
import {
  Container,
  Divider,
  InputAdornment,
  TextField,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const page = () => {
  return (
    <>
      <Header />
      <div className="about-header min-h-[673px] w-full flex pl-48 mt-32">
        <h1 className="text-[#97AFDE] text-[96px]">About Us</h1>
      </div>
      <Container fixed>
        <div className="flex flex-col gap-6">
          <h2 className="text-[#97AFDE] text-[36px]">Who We Are?</h2>
          <Divider />
          <p className="max-w-[949px]">
            We are revolutionizing the car rental industry with a modern and
            professional platform designed exclusively for connecting rental
            companies and brokers. Our goal is to ensure secure, transparent,
            and efficient collaboration for all users.
          </p>
          <h2 className="text-[#97AFDE] text-[36px]">Why Choose Us?</h2>
          <Divider />
          <p className="max-w-[949px]">
            Unmatched Security: Verified documents and identity checks ensure
            that all users are authentic and trustworthy. Streamlined
            Management: Effortlessly handle vehicle fleets and reservations in a
            user-friendly system. Modern Design: Our minimalist and intuitive
            interface guarantees a seamless experience. Our Mission To create a
            trusted, efficient platform where rental companies and brokers can
            collaborate with ease, focusing on their growth while we handle the
            technical complexities.
          </p>
          <h2 className="text-[#97AFDE] text-[36px]">Join US</h2>
          <Divider />
          <p className="max-w-[949px]">
            Become part of a professional network that transforms the way you
            manage vehicles and reservations. We are the solution you’ve always
            needed!
          </p>
        </div>
      </Container>
      <div className="about-footer w-full min-h-[673px] flex justify-end items-center pr-20">
        <div className="h-full">
          <h2 className="text-[#97AFDE] text-[36px]">Contact Us</h2>
          <p className="text-[#A0A0A0] mb-3">
            Can’t find what you’re looking for? Let us know your question, and
            we’ll assist you
          </p>
          <div>
            <TextField
              sx={{
                "& .MuiInputBase-root": {
                  height: "100%",
                  backgroundColor: "#F0F2F6",
                  borderRadius: "20px",
                  border: "1px solid #A0A0A0",
                },
              }}
              fullWidth
              placeholder="Write your question"
              multiline
              rows={8}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        color="primary"
                        sx={{
                          backgroundColor: "#97AFDE",
                          ":hover": { backgroundColor: "#97AFfE" },
                        }}
                      >
                        <SendIcon sx={{ color: "#fff" }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default page;
